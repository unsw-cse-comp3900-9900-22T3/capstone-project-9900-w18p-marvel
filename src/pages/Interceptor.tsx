import { FC } from "react";

type InterceptorProps = {
  authorized: boolean;
  children: JSX.Element;
};

export const Interceptor = ({ authorized, children }: InterceptorProps) => (
  <div className="w-full h-full">{authorized && children}</div>
);
