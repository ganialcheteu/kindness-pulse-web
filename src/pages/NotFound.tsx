import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(`Goodness 404: "${location.pathname}" not found.`);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center bg-[url('./assets/hero-tanzanian-woman.jpg')] bg-cover bg-center bg-no-repeat">
      {/* effect */}
      <div
        className="text-[140px] sm:text-[180px] font-extrabold text-green-500 transition-transform duration-500 hover:-translate-y-2 motion-safe:animate-pulse"
        style={{ textShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
      >
        404
      </div>

      {/* Main Message */}
      <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-foreground">
        Oups ! Page Not Found
      </h2>

      {/* dynamic URL */}
      <p className="mt-2 text-sm">
        URL{" "}
        <code className="bg-muted px-2 py-1 rounded text-red-500 font-mono">
          {location.pathname}
        </code>{" "}
        not exist in <strong>Goodness</strong>.
      </p>

      {/* go home */}
      <a
        href="/"
        className="mt-6 inline-block rounded bg-green-500 px-6 py-3 text-white font-medium shadow hover:bg-green-600 transition"
      >
        Go Back 
      </a>
    </div>
  );
};

export default NotFound;
