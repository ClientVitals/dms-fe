import { useRef, useEffect } from "react"

const DocViewer = () => {
    const containerRef = useRef(null);

    useEffect(() => {
      const container = containerRef.current;
      let cleanup = () => {};
  
      (async () => {
        const NutrientViewer = (await import("@nutrient-sdk/viewer")).default;
  
        // Ensure there's only one NutrientViewer instance
        NutrientViewer.unload(container);
  
        if (container && NutrientViewer) {
          NutrientViewer.load({
            container,
            // You can also specify a file in public directory, for example /document.pdf
            document: "https://www.nutrient.io/downloads/pspdfkit-web-demo.pdf",
            // baseUrl tells the SDK where to load the assets from
            baseUrl: `${window.location.protocol}//${window.location.host}/${
              import.meta.env.PUBLIC_URL ?? ""
            }`,
          });
        }
  
        cleanup = () => {
          NutrientViewer.unload(container);
        };
      })();
  
      return cleanup;
    }, []);
  
    // Set the container height and width
    return <div ref={containerRef} style={{ height: "100vh", width: "100vw" }} />;
}
  

export default DocViewer