export const useGenerateTransactionId = (): string => {
    const letters = generateTwoLetterCode();
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000);
    return `${letters}-${datePart}-${randomPart}`;
};
  


const generateTwoLetterCode = (): string => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return (
      letters[Math.floor(Math.random() * 26)] +
      letters[Math.floor(Math.random() * 26)]
    );
  };