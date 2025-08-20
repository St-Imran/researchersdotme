// export default function Blogs () {
//     const styles = {
//         main:{
//             minHeight: '95vh'
//         }
//     }
//     return (
//         <div style={styles.main}> Here in Blogs page </div>
//     );
// }

// export default function Blogs() {
//   const styles = {
//     main: {
//       minHeight: "95vh",
//     },
//   };

//   return (
//     <div
//       className="min-h-[95vh] flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
//       style={styles.main}
//     >
//       <div className="text-center text-white px-6">
//         <h1 className="text-5xl font-extrabold drop-shadow-lg mb-4 animate-pulse">
//           Blogs Coming Soon 🚀
//         </h1>
//         <p className="text-lg font-light drop-shadow-md">
//           We’re crafting insightful stories, tutorials, and updates. Stay tuned
//           for something amazing ✨
//         </p>
//       </div>
//     </div>
//   );
// }

export default function Blogs() {
  const styles = {
    main: {
      minHeight: "95vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      //   background: "linear-gradient(to right, #8b5cf6, #ec4899, #ef4444)", // purple → pink → red
      //   background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      //   background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      //   background: "linear-gradient(135deg, #667eea, #764ba2)",
      background: "linear-gradient(135deg, #11998e, #38ef7d)",
      //   background: "linear-gradient(135deg, #232526, #414345)",
      //   background: "linear-gradient(135deg, #1e3c72, #2a5298, #6a11cb)",
      //   background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      //   background: "linear-gradient(135deg, #232526, #414345)",
      color: "white",
      textAlign: "center",
      padding: "1rem",
    },
    heading: {
      fontSize: "3rem",
      fontWeight: "bold",
      textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
      marginBottom: "1rem",
    },
    paragraph: {
      fontSize: "1.25rem",
      fontWeight: "300",
      textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
    },
  };

  return (
    <main style={styles.main}>
      <div>
        <h1 style={styles.heading}>Blogs Coming Soon 🚀</h1>
        <p style={styles.paragraph}>
          We’re crafting insightful stories, tutorials, and updates.
          <br />
          Stay tuned for something amazing ✨
        </p>
      </div>
    </main>
  );
}
