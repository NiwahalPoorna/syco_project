import React from "react";
import RagistrationPage from "../Components/RagistrationPage";
import myImage from "../my.jpg";
function SignupPage() {
  const styles = {
    backgroundImage: `url(${myImage})`,

    backgroundSize: "cover",
  };
  return (
    <div style={styles}>
      <RagistrationPage />
    </div>
  );
}

export default SignupPage;
