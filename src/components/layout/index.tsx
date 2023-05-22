import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <div>layout...</div>

      {children}
    </div>
  );
};
