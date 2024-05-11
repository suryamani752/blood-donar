import React from "react";

const ProgressBar = ({ bgcolor, progress, height, total }) => {
  const Parentdiv = {
    height: height,
    width: "100%",
    backgroundColor: "whitesmoke",
    borderRadius: 50,
    margin: 50,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 50,
    textAlign: "center",
  };

  const progresstext = {
    padding: 20,
    color: "black",
    fontWeight: 900,
  };
  return (
    <>
      <div style={Parentdiv}>
        <div style={Childdiv}>
          <span style={progresstext}>{`${total} : ${progress}%`}</span>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
