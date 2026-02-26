
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ScrollToTop from "./components/ScrollToTop";

// // import { useSubpages } from "./hooks/useSubpages";
// import PageView from "./PageView";
// import KnowMore from "./sections/Subpages/DeanKnowMore";
// import MainMicropage from "./sections/Micropages/Main-micropage";

// function App() {
//   // const { data: subpages = [], isLoading, error } = useSubpages();

//   // if (isLoading) return <div>Loading...</div>;
//   // if (error) return <div>Error loading site</div>;

//   return (
//     <>
//       <Navbar />
//       <ScrollToTop />

//       <Routes>
     
//         <Route path="/" element={<PageView />} />

//         {/* <Route path="/jnmc/micro-pages/key-official" element={<MainMicropage />} /> */}
// <Route
//   path="/:pageSlug/:microSlug"
//   element={<PageView />}
// />
// <Route
//   path="/:college/:pageSlug/:microSlug"
//   element={<PageView />}
// />

    
//         <Route
//           path="/:college/micro-pages/:microSlug"
//           element={<MainMicropage  />}
//         />


//         <Route
//           path="/:college/:page"
//           element={<PageView  />}
//         />

   
//         <Route
//           path="/:slug"
//           element={<PageView   />}
//         />
//       </Routes>

//       <Footer />
//     </>
//   );
// }

// export default App;
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageView from "./PageView";
import SubPrograms from "./sections/Subpages/Programs";

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>

        {/* Home */}
        <Route path="/" element={<PageView />} />

        {/* Subpage */}
        <Route
          path="/:college/:page"
          element={<PageView />}
        />

        {/* Normal Slug */}
        <Route
          path="/:slug"
          element={<PageView />}
        />
 <Route
          path="/programs/:slug"
          element={
            <SubPrograms apiBaseUrl="https://convomax.com/admin_dmiher/api/pages" />
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;