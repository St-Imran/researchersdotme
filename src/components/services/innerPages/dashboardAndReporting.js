import Typography from "@mui/material/Typography";
import Image from "next/image";
function DashboardAndReporting() {
  return (
    <>
      <Typography component="div" className="title__section">
        <Typography variant="h1">Dashboard And Reporting</Typography>
      </Typography>
      <Typography component="div" className="container">
        <Typography component="div" className="story__content">
          <Typography variant="h3">Dashboard And Reporting</Typography>
          <p>
            Data storytelling for business is the key to turning raw data into a
            compelling narrative that drives results in the modern UAE
            marketplace.
          </p>
          <Typography variant="h6">
            The Core Components of Data Storytelling
          </Typography>
          <p style={{ fontWeight: "bold" }}>
            In data storytelling, a strategic blend of narrative, visuals, and
            data visualization forms the bedrock of effective communication.
          </p>
          <p>
            Leveraging business analytic tools in the UAE enriches your
            narrative, ensuring that your data story is equipped with the
            necessary depth and clarity.
          </p>
          <Typography variant="h6">Types of Data Storytelling</Typography>
          <Typography component="div" className="row">
            <Typography component="div" className="col-md-6">
              <ol>
                <li>
                  <p>
                    <strong>Descriptive Storytelling:</strong> This type paints
                    a vivid picture of historical data trends and patterns,
                    providing context for decision-making. It helps businesses
                    understand past performance and make informed choices based
                    on established patterns.
                  </p>
                </li>
              </ol>
            </Typography>
            <Typography component="div" className="col-md-6">
              <Image
                src="/rese-11.jpg"
                width={500}
                height={300}
                alt="Types of Data Storytelling"
              />
            </Typography>
          </Typography>
          <Typography variant="h6">
            Why Choose Researchers.me for Your Data Storytelling in UAE?
          </Typography>
        </Typography>
      </Typography>
    </>
  );
}

export default DashboardAndReporting;
