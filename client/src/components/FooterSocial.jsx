import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import FooterBrowseBox from "./FooterBrowseBox";

export default function FooterSocial() {
  const { SERVER_URI } = useAuth();
  const [count, setCount] = useState([]);

  const GetCount = async () => {
    const request = await fetch(`${SERVER_URI}/api/blog/count`, {
      method: "GET",
    });

    const response = await request.json();
    if (request.status === 200) setCount(response);
  };

  useEffect(() => {
    GetCount();
  }, []);

  return (
    <div>
      <div>
        <h1 className="footerHeader">Browse</h1>
        {count &&
          count.map(({ category, count }, i) => {
            return (
              <FooterBrowseBox key={i} category={category} count={count} />
            );
          })}
      </div>
    </div>
  );
}
