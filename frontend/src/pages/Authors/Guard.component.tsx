import { IGuardProps } from "../../types/common";

export const Guard = (props: IGuardProps) => {
  const hasRole = (requiredRole: string[]): boolean => {
    const found: string | undefined = requiredRole.find(
      (s) => user.role === s
    );
    return found !== undefined;
  };

  if (hasRole(props.requiredRoles)) {
    return <>{props.children}</>;
  } else {
    return <></>;
  }
};
