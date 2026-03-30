import Navbar from "../components/Navbar";
import Quiz from "../components/Quiz";
import Dashboard from "../components/Dashboard";
import Feedback from "../components/Feedback";

const Home = () => {
  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <Quiz />
        <Dashboard />
      </div>

      <div className="p-6">
        <Feedback />
      </div>
    </div>
  );
};

export default Home;