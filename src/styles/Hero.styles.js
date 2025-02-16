const commenbar = {
  padding: "20px",
  borderRadious: "10px",
  background: "black",
  color: "white",
  border: "none",
};

export const styles = {
  gradiant: {
    padding: "100px 0px",
    background: `linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%), linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)`,
  },
  gradiant2: {
    padding: "100px 0px",
    background: "linear-gradient(45deg,#ffde00,#00d1c3)",
    position: 'relative'
  },
  gradiant3: {
    padding: "100px 0px",
    backgroundSize: "100% 100%",
    backgroundPosition: "0px 0px,0px 0px,0px 0px,0px 0px,0px 0px",
    backgroundImage:
      "repeating-linear-gradient(315deg, #00FFFF2E 92%, #073AFF00 100%),repeating-radial-gradient(75% 75% at 238% 218%, #00FFFF12 30%, #073AFF14 39%),radial-gradient(99% 99% at 109% 2%, #00C9FFFF 0%, #073AFF00 100%),radial-gradient(99% 99% at 21% 78%, #7B00FFFF 0%, #073AFF00 100%),radial-gradient(160% 154% at 711px -303px, #2000FFFF 0%, #073AFFFF 100%)",
  },
  gradiant4: {
    padding: "100px 0px",
    background: "#EDE574",
    background: "-webkit-linear-gradient(to left, #E1F5C4, #EDE574)",
    background: "linear-gradient(to left, #E1F5C4, #EDE574)",
  },
  sidebarOpen: {
    ...commenbar,
    width: "300px",
  },
  sidebarClose: {
    ...commenbar,
    width: "100px",
  },
};
