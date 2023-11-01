import Layout from "./layouts/Layout";
import RegistrationForm from "./pages/RegistrationScreen";

function App() {
  return (
    <>
      <Layout />
      <RegistrationForm />
      {/* <UserDashboard
        user={{
          registrationType: "",
          attendees: [],
        }}
      /> */}
    </>
  );
}

export default App;
