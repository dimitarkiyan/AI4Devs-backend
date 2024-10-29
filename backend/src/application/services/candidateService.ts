import { Candidate } from '../../domain/models/Candidate';
import { validateCandidateData } from '../validator';
import { Education } from '../../domain/models/Education';
import { WorkExperience } from '../../domain/models/WorkExperience';
import { Resume } from '../../domain/models/Resume';

export const addCandidate = async (candidateData: any) => {
    try {
        validateCandidateData(candidateData); // Validar los datos del candidato
    } catch (error: any) {
        throw new Error(error);
    }

    const candidate = new Candidate(candidateData); // Crear una instancia del modelo Candidate
    try {
        const savedCandidate = await candidate.save(); // Guardar el candidato en la base de datos
        const candidateId = savedCandidate.id; // Obtener el ID del candidato guardado

        // Guardar la educación del candidato
        if (candidateData.educations) {
            for (const education of candidateData.educations) {
                const educationModel = new Education(education);
                educationModel.candidateId = candidateId;
                await educationModel.save();
                candidate.education.push(educationModel);
            }
        }

        // Guardar la experiencia laboral del candidato
        if (candidateData.workExperiences) {
            for (const experience of candidateData.workExperiences) {
                const experienceModel = new WorkExperience(experience);
                experienceModel.candidateId = candidateId;
                await experienceModel.save();
                candidate.workExperience.push(experienceModel);
            }
        }

        // Guardar los archivos de CV
        if (candidateData.cv && Object.keys(candidateData.cv).length > 0) {
            const resumeModel = new Resume(candidateData.cv);
            resumeModel.candidateId = candidateId;
            await resumeModel.save();
            candidate.resumes.push(resumeModel);
        }
        return savedCandidate;
    } catch (error: any) {
        if (error.code === 'P2002') {
            // Unique constraint failed on the fields: (`email`)
            throw new Error('The email already exists in the database');
        } else {
            throw error;
        }
    }
};

export const findCandidateById = async (id: number): Promise<Candidate | null> => {
    try {
        const candidate = await Candidate.findOne(id); // Cambio aquí: pasar directamente el id
        return candidate;
    } catch (error) {
        console.error('Error al buscar el candidato:', error);
        throw new Error('Error al recuperar el candidato');
    }
};

interface CandidateProgress {
    fullName: string;
    currentInterviewStep: string;
    averageScore: number | null;
}

export const getCandidatesByPosition = async (positionId: number): Promise<CandidateProgress[]> => {
    try {
        const candidates = await Candidate.findByPosition(positionId);
        return candidates.map(candidate => ({
            fullName: `${candidate.firstName} ${candidate.lastName}`,
            currentInterviewStep: String(candidate.applications[0]?.currentInterviewStep || 'Not started'),
            averageScore: calculateAverageScore(candidate.applications[0]?.interviews || [])
        }));
    } catch (error) {
        console.error('Error fetching candidates by position:', error);
        throw new Error('Error retrieving candidates for position');
    }
};

function calculateAverageScore(interviews: any[]): number | null {
    if (!interviews.length) return null;
    const scores = interviews.filter(interview => interview.score !== null).map(interview => interview.score);
    if (!scores.length) return null;
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

export const updateCandidateInterviewStep = async (id: number) => {
    const candidate = await Candidate.findOne(id);
    if (!candidate) {
        throw new Error('Candidate not found');
    }

    // Assuming currentInterviewStep is a number and we want to increment it
    const currentStep = candidate.applications[0]?.currentInterviewStep || 0;
    const newStep = Math.min(currentStep + 1, 3); // Increment and cap at 3

    // Update the candidate's interview step
    candidate.applications[0].currentInterviewStep = newStep;

    // Save the updated candidate
    return await candidate.save();
};
