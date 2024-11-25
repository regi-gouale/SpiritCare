export const Footer = () => {
  return (
    <footer className="sticky bottom-0 mx-auto mt-auto flex h-16 w-full items-center justify-center border-t bg-background p-4 text-center font-epilogue text-sm text-muted-foreground">
      <p>
        &copy; 2024 SipirtCare. All rights reserved. |{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Terms of Service
        </a>
      </p>
    </footer>
  );
};
