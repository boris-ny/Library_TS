import { IGuardProps } from '../types/common';

export const Guard = (props: IGuardProps) => {
	const currentuser = JSON.parse(localStorage.getItem('user') || '{}');

	const hasRole = (requiredRole: number[]): boolean => {
		const found: number | undefined = requiredRole.find(
			(s) => currentuser.permission === s
		);
		return found !== undefined;
	};

	if (hasRole(props.requiredRoles)) {
		return <>{props.children}</>;
	} else {
		return <></>;
	}
};
