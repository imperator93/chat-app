export const getFormInfo = (
  event: React.FormEvent
): { name: string; password: string } => {
  event.preventDefault();
  const username = ((event.target as HTMLFormElement)[0] as HTMLInputElement)
    .value;

  const password = ((event.target as HTMLFormElement)[1] as HTMLInputElement)
    .value;

  return { name: username, password: password };
};
