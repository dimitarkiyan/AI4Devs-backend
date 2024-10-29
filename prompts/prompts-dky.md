IDE used: Cursor

#1 --------------------------------------------------------------------------------

You are an expert backend developer with knowledge in NodeJS. I need you to build me a new GET endpoint. 
It will have this path: /position/:id/candidates

This endpoint will retrieve all the candidates in progress for a specific position, meaning all the applications for a particular positionID. It should provide the following basic information:

- Candidate’s full name (from the candidate table).
- current_interview_step: the phase of the process the candidate is in (from the application table).
- The candidate's average score. 

Remember that each interview (interview) conducted with the candidate has a score.

Make the service implementation in @candidateService.ts , the controller implementation in  @candidateController.ts , use the @Candidate.ts , @Interview.ts and any other files in that directory to get the idea of the database schema.

#2 --------------------------------------------------------------------------------

For getCandidatesByPositionController in  @candidateController.ts , generate me the code for @candidateRoutes.ts 

#3 --------------------------------------------------------------------------------

For the code present, we get this error:
```
Type '{ fullName: string; currentInterviewStep: string | number; averageScore: number | null; }[]' is not assignable to type 'CandidateProgress[]'.
  Type '{ fullName: string; currentInterviewStep: string | number; averageScore: number | null; }' is not assignable to type 'CandidateProgress'.
    Types of property 'currentInterviewStep' are incompatible.
      Type 'string | number' is not assignable to type 'string'.
        Type 'number' is not assignable to type 'string'.
```
How can I resolve this? If you propose a fix, please make it concise.

#4 --------------------------------------------------------------------------------

Now give me an example URL to call this new service.

#5 --------------------------------------------------------------------------------

This is not the path format I wanted, I want the following format: /position/:id/candidates
With the current implementation the current path starts with /candidates , change this, I want the complete full path to be /position/:id/candidates
Tell me the code modifications needed for this change. Maybe you need to create a new route file.

#5 --------------------------------------------------------------------------------

For the code present, we get this error:
```
Cannot find module '../controllers/candidateController' or its corresponding type declarations.
```
How can I resolve this? If you propose a fix, please make it concise. Use this file for context @candidateController.ts and the method getCandidatesByPositionController.

#7 --------------------------------------------------------------------------------

Now I want another new endpoint, this time it will be a PUT type.

It must have the following format: /candidate/:id

This endpoint will update the stage of the moved candidate. It allows modification of the current interview process phase for a specific candidate. :id is the identifier for @Candidate.ts , and the value to update is interviewStepId of . The update consists of adding +1 to the current value, with 3 being the current maximum. 

Create a new dedicated router file.
Generate me the code for @positionRoutes.ts , @candidateController.ts and @candidateService.ts 

#8 --------------------------------------------------------------------------------

For the code present, we get this error:
```
Import declaration conflicts with local declaration of 'updateCandidateInterviewStep'.
```
How can I resolve this? If you propose a fix, please make it concise.

#9 --------------------------------------------------------------------------------

I get the following error when running this new service: Argument `uploadDate` is missing.
    at Tn (C:\Users\dimitar.kirilovyank\Desktop\curso\AI4Devs-backend-main\backend\node_modules\@prisma\client\runtime\library.js:115:6855)
	
#10 -------------------------------------------------------------------------------

Now I get 'Unknown argument `candidateId`. Available options are marked with ?.'

