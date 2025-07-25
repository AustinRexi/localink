export const normalizeUrl = (url: string) => url.replace(/\/$/, "");

interface TruncateStringProps {
  text: string;
  length?: number;
  useDefaultBehavior?: boolean;
}

export const truncateString = ({
  text,
  useDefaultBehavior = false,
  length = 52,
}: TruncateStringProps) => {
  if (useDefaultBehavior && text.length <= length) return text;
  const shortString = text.slice(0, length);
  return `${shortString}...`;
};
