import Button from "@mui/material/Button";
import { Header, Footer } from "@/components";

function ThankYouPage() {
  return (
    <>
      <Header />
      <section className="thankyou-section">
        <div className="container">
          <div className="title-block">
            <div className="title">
              <h1>Thank you for your trust in us.</h1>
            </div>
            <p>
              Our team will do the analysis for you and a report will be sent to
              your email address within 72 hrs.
            </p>
            <p className="small-text">
              In case we need some more information, our team will contact you
            </p>
            <div className="btn-wrap">
              <Button variant="outlined" className="border-btn">
                View Report
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ThankYouPage;
