export const delayedResponse = async (ms: number = 1500) => {
  await new Promise(resolve => setTimeout(resolve, ms))
}
