import { createContext, useState, Fragment } from "react";
import { HashLoader } from "react-spinners";
export const useLoader = createContext(null);

export default function Loader({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <Fragment>
      <useLoader.Provider value={[loading, setLoading]}>
        {loading && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.55)",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10000,
            }}
          >
            <HashLoader color="#fc4ef0"/>
          </div>
        )}
        {children}
      </useLoader.Provider>
    </Fragment>
  );
}
