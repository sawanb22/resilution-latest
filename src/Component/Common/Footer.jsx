import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { trackTwitterEvent } from "../../utils/twitterTracking";
import { trackMetaEvent } from "../../utils/metaPixelTracking";

export const Footer = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    let email = document.querySelector("#email").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Email address not valid.");
      return;
    }
    let progress = toast.loading("Submitting...");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.update(progress, {
          render: "🌟 Thanks for subscribing!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        document.querySelector("#email").value = "";
      } else {
        console.log(data);
        toast.update(progress, {
          render: "Failed to subscribe",
          type: "warning",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (err) {
      // Log the error for debugging and still notify the user
      // using the toast. This uses `err` so the linter won't complain.
      console.error(err);
      toast.update(progress, {
        render: "Something went wrong.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };
  return (
    <footer className="bg-(--dark)">
      <ToastContainer theme="dark" autoClose={3000} />
      <div className="container px-3 xl:px-10 flex flex-col sm:flex-row justify-between py-10 mx-auto">
        <div className="max-sm:flex justify-between">
          <Link to="/">
            <img src="/logo.svg" alt="" />
          </Link>
          <p className="max-sm:hidden text-(--light) opacity-60 my-5">
            All rights are reserved @2025
          </p>

          {/* All Icons here */}
          <div className="flex gap-3 sm:mt-17">
            <a href="https://www.instagram.com/mattresil" target="_blank">
              <img
                src="/icons/instagram.svg"
                width="21px"
                height="21px"
                alt=""
              />
            </a>
            <a
              href="https://www.facebook.com/Resilutionforthefuture"
              target="_blank"
            >
              <img
                src="/icons/facebook.svg"
                width={"22px"}
                height="22px"
                alt=""
              />
            </a>
            <a
              href="https://www.youtube.com/@Resilblockchain"
              target="_blank"
            >
              <img
                src="/icons/youtube.svg"
                width={"22px"}
                height="22px"
                alt=""
              />
            </a>
            <a href=" https://t.me/Resilution" target="_blank">
              <img
                src="/icons/telegram.svg"
                width={"22px"}
                height="22px"
                alt=""
              />
            </a>
            <a
              href="https://discord.com/invite/KG5WKCnkWW"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackTwitterEvent("tw-qlrnc-qw38j");
                trackMetaEvent("JoinDiscordClick", { location: "footer_discord_icon" });
              }}
            >
              <img src="/icons/discode.svg" width="22px" height="22px" alt="Discord" />
            </a>
            <a
              href="https://www.reddit.com/r/ResilutionCommunity"
              target="_blank"
            >
              <img
                src="/icons/reddit.svg"
                width={"26px"}
                height="26px"
                alt=""
              />
            </a>
            <a href="https://x.com/Resilblockchain" target="_blank">
              <img
                src="/icons/twiter.svg"
                width={"22px"}
                height="22px"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-7 max-sm:mt-7">
          <p className="text-center text-(--light) text-[22px]">
            Subscribe to our newsletter
          </p>
          <form>
            <input
              type="email"
              id="email"
              className="block bg-(--light) py-3 px-4 outline-none rounded text-(--dark) w-[100%] sm:min-w-[310px]"
              placeholder="Enter Email Address"
              required
            />
            <button
              className="w-[100%] py-3 text-xl bg-(--savegreen) mt-3 rounded"
              type="submit"
              onClick={handleSubmit}
            >
              Subscribe Now
            </button>
          </form>
          {/* <a href="#" target='_blank'>
            <img src="/icons/twiter.svg" width="21px" height="21px" alt="" />
          </a>
          <a href="#" target='_blank'>
            <img src="/icons/tg.svg" width={"22px"} height="22px" alt="" />
          </a> */}
        </div>
      </div>
      <p className="text-(--light) opacity-60 text-center sm:hidden pb-2">
        All rights are reserved @2025
      </p>
    </footer>
  );
};
