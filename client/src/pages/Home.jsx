import Blogs from "../components/Blogs";
import Feature from "../components/Feature";

export default function Home() {
  return (
    <section className="container">
      <Feature />
      <Blogs />
    </section>
  );
}
