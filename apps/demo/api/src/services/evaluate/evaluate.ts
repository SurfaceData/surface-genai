import { interactionLogger } from 'src/lib/genai';

export const evaluate = async ({ input }) => {
  const { requestId, interactionType, evalType, rating } = input;
  const id = await interactionLogger.saveInteractionEvaluation(
    requestId,
    interactionType,
    evalType,
    rating
  );
  return { id };
};
