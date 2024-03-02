export const getMonths = (value = "") =>
  +value > 12 ? "12" : (value.length > 1 && !+value) ? "01" : value;

export const getDays = (value = "") =>
  +value > 31 ? "31" : (value.length > 1 && !+value) ? "01" : value;

export const getYears = (value = "") =>
  +value > 9999 ? "9999" : (value.length === 4 && !+value) ? new Date().getFullYear().toString() : value;

export const inputFilter = (value: string) => value.replace(/\D/g, "");

export const mask = (value: string) => {
  const mask = value.match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
  const months = getMonths(mask?.[1]);
  const days = getDays(mask?.[2]);
  const years = getYears(mask?.[3]);

  return {
    masked: !days ? `${months}` : !years ? `${months}/${days}` : `${months}/${days}/${years}`,
    months,
    days,
    years,
  };
};