"use client";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({ error, reset }: Props) {
  return (
    <MaxWidthWrapper>
      <div>{error.message}</div>
    </MaxWidthWrapper>
  );
}
