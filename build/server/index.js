import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { Link, Links, Meta, Outlet, RemixServer, Scripts, ScrollRestoration, useNavigate, useParams } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Activity, CheckCircle2, ChevronLeft, ChevronRight, ChevronUp, Download, FileText, Lock, PlayCircle } from "lucide-react";
import videojs from "video.js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({ default: () => handleRequest });
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
	return isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}
function isBotRequest(userAgent) {
	if (!userAgent) return false;
	if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") return isbotModule.isbot(userAgent);
	if ("default" in isbotModule && typeof isbotModule.default === "function") return isbotModule.default(userAgent);
	return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(RemixServer, {
			context: remixContext,
			url: request.url,
			abortDelay: ABORT_DELAY
		}), {
			onAllReady() {
				shellRendered = true;
				const body = new PassThrough();
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
				pipe(body);
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
		setTimeout(abort, ABORT_DELAY);
	});
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(RemixServer, {
			context: remixContext,
			url: request.url,
			abortDelay: ABORT_DELAY
		}), {
			onShellReady() {
				shellRendered = true;
				const body = new PassThrough();
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
				pipe(body);
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
		setTimeout(abort, ABORT_DELAY);
	});
}
//#endregion
//#region app/components/Logo.tsx
var Logo = ({ className = "", size = 40, showText = true, textColor = "text-slate-800" }) => {
	return /* @__PURE__ */ jsxs("div", {
		className: `flex items-center gap-3 ${className}`,
		children: [/* @__PURE__ */ jsx("div", {
			style: {
				width: size,
				height: size
			},
			className: "relative flex-shrink-0",
			children: /* @__PURE__ */ jsxs("svg", {
				viewBox: "0 0 100 100",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				className: "w-full h-full drop-shadow-sm",
				children: [
					/* @__PURE__ */ jsxs("defs", { children: [/* @__PURE__ */ jsxs("linearGradient", {
						id: "logo-gradient",
						x1: "0%",
						y1: "0%",
						x2: "100%",
						y2: "100%",
						children: [/* @__PURE__ */ jsx("stop", {
							offset: "0%",
							stopColor: "#3b82f6"
						}), /* @__PURE__ */ jsx("stop", {
							offset: "100%",
							stopColor: "#6366f1"
						})]
					}), /* @__PURE__ */ jsxs("filter", {
						id: "glow",
						children: [/* @__PURE__ */ jsx("feGaussianBlur", {
							stdDeviation: "2",
							result: "blur"
						}), /* @__PURE__ */ jsx("feComposite", {
							in: "SourceGraphic",
							in2: "blur",
							operator: "over"
						})]
					})] }),
					/* @__PURE__ */ jsx("path", {
						d: "M30 20C30 14.4772 34.4772 10 40 10H70C75.5228 10 80 14.4772 80 20V30C80 35.5228 75.5228 40 70 40H50V70C50 75.5228 45.5228 80 40 80H20C14.4772 80 10 75.5228 10 70V30C10 24.4772 14.4772 20 20 20H30Z",
						fill: "url(#logo-gradient)",
						opacity: "0.15"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M45 15L45 65C45 73.2843 38.2843 80 30 80L20 80",
						stroke: "url(#logo-gradient)",
						strokeWidth: "12",
						strokeLinecap: "round"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M45 15L75 15C83.2843 15 90 21.7157 90 30L90 40",
						stroke: "url(#logo-gradient)",
						strokeWidth: "12",
						strokeLinecap: "round"
					}),
					/* @__PURE__ */ jsx("circle", {
						cx: "70",
						cy: "60",
						r: "12",
						fill: "url(#logo-gradient)",
						filter: "url(#glow)"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M70 45V50M70 70V75M85 60H80M55 60H60",
						stroke: "url(#logo-gradient)",
						strokeWidth: "4",
						strokeLinecap: "round"
					})
				]
			})
		}), showText && /* @__PURE__ */ jsxs("span", {
			className: `text-2xl font-black tracking-tight leading-none ${textColor} no-underline`,
			children: ["Lumina", /* @__PURE__ */ jsx("span", {
				className: "text-blue-600",
				children: "."
			})]
		})]
	});
};
//#endregion
//#region app/components/lumina/Navbar.tsx
var Navbar = () => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedUser = localStorage.getItem("lumina_user");
			if (storedUser) setUser(JSON.parse(storedUser));
		}
	}, []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("header", {
		className: "header-area",
		id: "sticky-header",
		children: /* @__PURE__ */ jsx("div", {
			className: "container",
			children: /* @__PURE__ */ jsxs("div", {
				className: "row align-items-center",
				children: [/* @__PURE__ */ jsx("div", {
					className: "col-lg-2",
					children: /* @__PURE__ */ jsx("div", {
						className: "logo",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/",
							className: "no-underline border-none",
							children: /* @__PURE__ */ jsx(Logo, {})
						})
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "col-lg-10",
					children: /* @__PURE__ */ jsxs("div", {
						className: "header-menu",
						children: [/* @__PURE__ */ jsxs("ul", { children: [
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsxs(Link, {
								to: "/",
								children: ["Home ", /* @__PURE__ */ jsx("i", { className: "bi bi-plus" })]
							}), /* @__PURE__ */ jsx("div", {
								className: "sub-menu",
								children: /* @__PURE__ */ jsxs("ul", { children: [/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
									to: "/",
									children: "Home "
								}) }), /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
									to: "/course/go-concurrency",
									children: "Learning Platform"
								}) })] })
							})] }),
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsxs(Link, {
								to: "/courses",
								children: ["Courses ", /* @__PURE__ */ jsx("i", { className: "bi bi-plus" })]
							}), /* @__PURE__ */ jsx("div", {
								className: "sub-menu",
								children: /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
									to: "/courses",
									children: "Courses"
								}) }) })
							})] }),
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsxs("a", {
								href: "#",
								children: ["Team ", /* @__PURE__ */ jsx("i", { className: "bi bi-plus" })]
							}), /* @__PURE__ */ jsx("div", {
								className: "sub-menu",
								children: /* @__PURE__ */ jsxs("ul", { children: [/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
									to: "/",
									children: "Our Team"
								}) }), /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
									to: "/",
									children: "Team Details"
								}) })] })
							})] }),
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsxs("a", {
								href: "#",
								children: ["Pages ", /* @__PURE__ */ jsx("i", { className: "bi bi-plus" })]
							}), /* @__PURE__ */ jsx("div", {
								className: "sub-menu",
								children: /* @__PURE__ */ jsxs("ul", { children: [/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
									to: "/contact",
									children: "Contact Us"
								}) }), /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
									to: "/course/go-concurrency",
									children: "Learning Engine"
								}) })] })
							})] }),
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsxs("a", {
								href: "#",
								children: ["Blog ", /* @__PURE__ */ jsx("i", { className: "bi bi-plus" })]
							}), /* @__PURE__ */ jsx("div", {
								className: "sub-menu",
								children: /* @__PURE__ */ jsxs("ul", { children: [/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
									to: "/",
									children: "Latest Blog"
								}) }), /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
									to: "/",
									children: "Blog Details"
								}) })] })
							})] }),
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
								to: "/contact",
								children: "Contacts"
							}) }),
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
								className: "handbag",
								to: "#",
								children: /* @__PURE__ */ jsx("i", { className: "bi bi-cart-fill" })
							}) }),
							/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
								className: "user",
								to: "/course/go-concurrency",
								children: /* @__PURE__ */ jsx("i", { className: "bi bi-person-fill" })
							}) })
						] }), /* @__PURE__ */ jsx("div", {
							className: "main-btn",
							children: user ? /* @__PURE__ */ jsxs(Link, {
								to: "/course/go-concurrency",
								className: "nest-btn",
								children: [
									/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
									/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
									/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
									/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
									/* @__PURE__ */ jsx("span", {
										className: "nest-btn__text",
										children: "Dashboard"
									})
								]
							}) : /* @__PURE__ */ jsxs(Link, {
								to: "/auth",
								className: "nest-btn",
								children: [
									/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
									/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
									/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
									/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
									/* @__PURE__ */ jsx("span", {
										className: "nest-btn__text",
										children: "Get Started"
									})
								]
							})
						})]
					})
				})]
			})
		})
	}), /* @__PURE__ */ jsx("div", {
		className: "mobile-menu-area sticky-menu",
		id: "navbar",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mobile-menu",
			children: [/* @__PURE__ */ jsx("div", {
				className: "mobile-logo",
				children: /* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "no-underline",
					children: /* @__PURE__ */ jsx(Logo, { size: 32 })
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "side-menu-info",
				children: /* @__PURE__ */ jsx("div", {
					className: "sidebar-menu",
					children: /* @__PURE__ */ jsx("a", {
						className: "navSidebar-button",
						href: "#",
						children: /* @__PURE__ */ jsx("i", { className: "bi bi-justify-right" })
					})
				})
			})]
		})
	})] });
};
//#endregion
//#region app/components/lumina/Footer.tsx
var Footer = () => {
	return /* @__PURE__ */ jsx("div", {
		className: "footer-area pb-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "footer-shape1 bounce-animate-slow",
					children: /* @__PURE__ */ jsx("img", {
						src: "/lumina-assets/images/footer/footer-shape-1.png",
						alt: ""
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "footer-shape2 bounce-animate-slow",
					children: /* @__PURE__ */ jsx("img", {
						src: "/lumina-assets/images/footer/footer-shape-2.png",
						alt: ""
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "row",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "col-lg-3 col-md-6",
							children: /* @__PURE__ */ jsxs("div", {
								className: "footer-wiget",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "footer-wiget-logo",
										children: /* @__PURE__ */ jsx(Link, {
											to: "/",
											className: "no-underline",
											children: /* @__PURE__ */ jsx(Logo, { textColor: "text-white" })
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "footer-wiget-text",
										children: /* @__PURE__ */ jsx("h4", { children: "Empowering students worldwide through our high-concurrency video delivery infrastructure." })
									}),
									/* @__PURE__ */ jsx("div", {
										className: "footer-socilal-title",
										children: /* @__PURE__ */ jsx("h4", { children: "Follow us on" })
									}),
									/* @__PURE__ */ jsx("div", {
										className: "footer-social",
										children: /* @__PURE__ */ jsxs("ul", { children: [
											/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
												href: "#",
												children: /* @__PURE__ */ jsx("i", { className: "fab fa-facebook-f" })
											}) }),
											/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
												href: "#",
												children: /* @__PURE__ */ jsx("i", { className: "fab fa-twitter" })
											}) }),
											/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
												href: "#",
												children: /* @__PURE__ */ jsx("i", { className: "fab fa-vimeo-v" })
											}) }),
											/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
												href: "#",
												children: /* @__PURE__ */ jsx("i", { className: "fab fa-instagram" })
											}) })
										] })
									})
								]
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-lg-3 col-md-6",
							children: /* @__PURE__ */ jsxs("div", {
								className: "footer-wiget",
								children: [/* @__PURE__ */ jsx("div", {
									className: "footer-wiget-title",
									children: /* @__PURE__ */ jsx("h4", { children: "Quick Links" })
								}), /* @__PURE__ */ jsx("div", {
									className: "footer-wiget-menu",
									children: /* @__PURE__ */ jsxs("ul", { children: [
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
											to: "/",
											children: "Home"
										}) }),
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
											to: "/contact",
											children: "Contact Us"
										}) }),
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
											to: "/courses",
											children: "Courses"
										}) }),
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
											to: "/course/go-concurrency",
											children: "Learning Platform"
										}) })
									] })
								})]
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-lg-3 col-md-6",
							children: /* @__PURE__ */ jsxs("div", {
								className: "footer-wiget",
								children: [/* @__PURE__ */ jsx("div", {
									className: "footer-wiget-title",
									children: /* @__PURE__ */ jsx("h4", { children: "Get In Touch" })
								}), /* @__PURE__ */ jsx("div", {
									className: "footer-wiget-touch",
									children: /* @__PURE__ */ jsxs("ul", { children: [
										/* @__PURE__ */ jsxs("li", { children: [
											/* @__PURE__ */ jsx("div", {
												className: "icon",
												children: /* @__PURE__ */ jsx("i", { className: "bi bi-geo-alt" })
											}),
											/* @__PURE__ */ jsx("div", {
												className: "title",
												children: /* @__PURE__ */ jsx("h6", { children: "Address" })
											}),
											/* @__PURE__ */ jsx("div", {
												className: "adress",
												children: /* @__PURE__ */ jsx("a", {
													href: "#",
													children: "244, First Floor, Los Angeles"
												})
											})
										] }),
										/* @__PURE__ */ jsxs("li", { children: [
											/* @__PURE__ */ jsx("div", {
												className: "icon",
												children: /* @__PURE__ */ jsx("i", { className: "bi bi-telephone-plus-fill" })
											}),
											/* @__PURE__ */ jsx("div", {
												className: "title",
												children: /* @__PURE__ */ jsx("h6", { children: "Phone" })
											}),
											/* @__PURE__ */ jsx("div", {
												className: "adress",
												children: /* @__PURE__ */ jsx("a", {
													href: "#",
													children: "(+01) 123 456 7890"
												})
											})
										] }),
										/* @__PURE__ */ jsxs("li", { children: [
											/* @__PURE__ */ jsx("div", {
												className: "icon",
												children: /* @__PURE__ */ jsx("i", { className: "bi bi-envelope" })
											}),
											/* @__PURE__ */ jsx("div", {
												className: "title",
												children: /* @__PURE__ */ jsx("h6", { children: "Email" })
											}),
											/* @__PURE__ */ jsx("div", {
												className: "adress",
												children: /* @__PURE__ */ jsx("a", {
													href: "#",
													children: "info@lumina-learning.com"
												})
											})
										] })
									] })
								})]
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-lg-3 col-md-6",
							children: /* @__PURE__ */ jsxs("div", {
								className: "footer-wiget",
								children: [/* @__PURE__ */ jsx("div", {
									className: "footer-wiget-title",
									children: /* @__PURE__ */ jsx("h4", { children: "Our Projects" })
								}), /* @__PURE__ */ jsx("div", {
									className: "footer-widget-photo",
									children: /* @__PURE__ */ jsxs("ul", { children: [
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("img", {
											src: "/lumina-assets/images/footer/footer1.png",
											alt: ""
										}) }),
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("img", {
											src: "/lumina-assets/images/footer/footer2.png",
											alt: ""
										}) }),
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("img", {
											src: "/lumina-assets/images/footer/footer3.png",
											alt: ""
										}) }),
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("img", {
											src: "/lumina-assets/images/footer/footer4.png",
											alt: ""
										}) }),
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("img", {
											src: "/lumina-assets/images/footer/footer5.png",
											alt: ""
										}) }),
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("img", {
											src: "/lumina-assets/images/footer/footer6.png",
											alt: ""
										}) })
									] })
								})]
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "row align-items-center mt-90",
					children: [/* @__PURE__ */ jsx("div", {
						className: "col-lg-6 col-md-12",
						children: /* @__PURE__ */ jsx("div", {
							className: "copyright-text",
							children: /* @__PURE__ */ jsxs("p", { children: ["© 2026 | All rights reserved by ", /* @__PURE__ */ jsx(Link, {
								to: "/",
								children: "Lumina Learning"
							})] })
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "col-lg-6 col-md-12",
						children: /* @__PURE__ */ jsx("div", {
							className: "footer-privacy-menu",
							children: /* @__PURE__ */ jsxs("ul", { children: [/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
								href: "#",
								children: "Privacy Policy"
							}) }), /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
								href: "#",
								children: "Terms & Conditions"
							}) })] })
						})
					})]
				})
			]
		})
	});
};
//#endregion
//#region app/components/ScrollToTop.tsx
var ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => {
		if (window.pageYOffset > 300) setIsVisible(true);
		else setIsVisible(false);
	};
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);
	return /* @__PURE__ */ jsx("div", {
		className: "fixed bottom-10 right-10 z-[9999]",
		children: isVisible && /* @__PURE__ */ jsx("button", {
			onClick: scrollToTop,
			className: "w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all duration-300 animate-in fade-in zoom-in",
			"aria-label": "Scroll to top",
			children: /* @__PURE__ */ jsx(ChevronUp, { className: "w-6 h-6" })
		})
	});
};
//#endregion
//#region app/hooks/use-mounted.ts
function useMounted() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	return mounted;
}
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	Layout: () => Layout,
	default: () => App,
	links: () => links,
	meta: () => meta
});
var links = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "/lumina-assets/css/bootstrap.min.css"
	},
	{
		rel: "stylesheet",
		href: "/lumina-assets/css/owl.carousel.min.css"
	},
	{
		rel: "stylesheet",
		href: "/lumina-assets/css/animate.css"
	},
	{
		rel: "stylesheet",
		href: "/lumina-assets/css/all.min.css"
	},
	{
		rel: "stylesheet",
		href: "/lumina-assets/css/flaticon.css"
	},
	{
		rel: "stylesheet",
		href: "/lumina-assets/css/theme-default.css"
	},
	{
		rel: "stylesheet",
		href: "/lumina-assets/css/meanmenu.min.css"
	},
	{
		rel: "stylesheet",
		href: "/lumina-assets/css/owl.transitions.css"
	},
	{
		rel: "stylesheet",
		href: "/lumina-assets/venobox/venobox.css"
	},
	{
		rel: "stylesheet",
		href: "/lumina-assets/css/bootstrap-icons.css"
	},
	{
		rel: "stylesheet",
		href: "/lumina-assets/css/style.css"
	},
	{
		rel: "stylesheet",
		href: "/lumina-assets/css/dropdown.css"
	},
	{
		rel: "stylesheet",
		href: "/lumina-assets/css/responsive.css"
	},
	{
		rel: "icon",
		type: "image/png",
		sizes: "56x56",
		href: "/lumina-assets/images/fav-icon/icon.png"
	}
];
var meta = () => [{ title: "Lumina Learning - Online Education & LMS" }];
function Layout({ children }) {
	const isMounted = useMounted();
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			/* @__PURE__ */ jsx(Navbar, {}),
			children,
			/* @__PURE__ */ jsx(Footer, {}),
			isMounted && /* @__PURE__ */ jsx(ScrollToTop, {}),
			/* @__PURE__ */ jsx("div", {
				className: "sidebar-group info-group",
				children: /* @__PURE__ */ jsx("div", {
					className: "sidebar-widget",
					children: /* @__PURE__ */ jsxs("div", {
						className: "sidebar-widget-container",
						children: [/* @__PURE__ */ jsx("div", {
							className: "widget-heading",
							children: /* @__PURE__ */ jsx("a", {
								href: "#",
								className: "close-side-widget",
								children: /* @__PURE__ */ jsx("i", { className: "bi bi-x-lg" })
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "sidebar-textwidget",
							children: /* @__PURE__ */ jsx("div", {
								className: "sidebar-info-contents",
								children: /* @__PURE__ */ jsxs("div", {
									className: "content-inner",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "sidebar-logo",
											children: /* @__PURE__ */ jsx(Link, {
												to: "/",
												className: "no-underline border-none",
												children: /* @__PURE__ */ jsx(Logo, { size: 35 })
											})
										}),
										/* @__PURE__ */ jsx("div", {
											className: "sidebar-widget-menu",
											children: /* @__PURE__ */ jsxs("ul", { children: [
												/* @__PURE__ */ jsx("li", {
													className: "dropdown",
													children: /* @__PURE__ */ jsx(Link, {
														to: "/",
														children: "Home"
													})
												}),
												/* @__PURE__ */ jsx("li", {
													className: "dropdown",
													children: /* @__PURE__ */ jsx(Link, {
														to: "/courses",
														children: "Courses"
													})
												}),
												/* @__PURE__ */ jsx("li", {
													className: "dropdown",
													children: /* @__PURE__ */ jsx(Link, {
														to: "/contact",
														children: "Contacts"
													})
												})
											] })
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "contact-info",
											children: [/* @__PURE__ */ jsx("h2", { children: "Contact Info" }), /* @__PURE__ */ jsxs("ul", {
												className: "list-style-one",
												children: [
													/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("i", { className: "bi bi-geo-alt-fill" }), "6391 Elgin St. Celina, Delaware"] }),
													/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("i", { className: "bi bi-telephone-fill" }), "(+001) 123-456-789"] }),
													/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("i", { className: "bi bi-envelope" }), " info@lumina-learning.com"] })
												]
											})]
										}),
										/* @__PURE__ */ jsxs("ul", {
											className: "social-box",
											children: [
												/* @__PURE__ */ jsx("li", {
													className: "facebook",
													children: /* @__PURE__ */ jsx("a", {
														href: "#",
														className: "fab fa-facebook-f"
													})
												}),
												/* @__PURE__ */ jsx("li", {
													className: "twitter",
													children: /* @__PURE__ */ jsx("a", {
														href: "#",
														className: "fab fa-instagram"
													})
												}),
												/* @__PURE__ */ jsx("li", {
													className: "linkedin",
													children: /* @__PURE__ */ jsx("a", {
														href: "#",
														className: "fab fa-twitter"
													})
												})
											]
										})
									]
								})
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/vendor/jquery-3.6.2.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/popper.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/bootstrap.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/owl.carousel.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/jquery.counterup.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/waypoints.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/wow.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/imagesloaded.pkgd.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/venobox/venobox.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/animated-text.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/isotope.pkgd.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/jquery.meanmenu.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/jquery.scrollUp.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/jquery.barfiller.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/rangeslider.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/mixitup.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/theme.js" }),
			/* @__PURE__ */ jsx("script", { src: "/lumina-assets/js/script.js" }),
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
function App() {
	return /* @__PURE__ */ jsx(Outlet, {});
}
//#endregion
//#region app/components/VideoPlayer.tsx
var VideoPlayer = (props) => {
	const videoRef = useRef(null);
	const playerRef = useRef(null);
	const { options, onReady } = props;
	useEffect(() => {
		if (!playerRef.current) {
			const videoElement = document.createElement("video-js");
			videoElement.classList.add("vjs-big-play-centered");
			videoRef.current?.appendChild(videoElement);
			const player = playerRef.current = videojs(videoElement, options, () => {
				videojs.log("player is ready");
				onReady && onReady(player);
			});
		} else {
			const player = playerRef.current;
			player.autoplay(options.autoplay);
			player.src(options.sources);
		}
	}, [options, videoRef]);
	useEffect(() => {
		const player = playerRef.current;
		return () => {
			if (player && !player.isDisposed()) {
				player.dispose();
				playerRef.current = null;
			}
		};
	}, [playerRef]);
	return /* @__PURE__ */ jsx("div", {
		"data-vjs-player": true,
		children: /* @__PURE__ */ jsx("div", { ref: videoRef })
	});
};
//#endregion
//#region app/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region app/components/LessonList.tsx
var LessonList = ({ lessons, onLessonSelect }) => {
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-1",
		children: lessons.map((lesson) => /* @__PURE__ */ jsxs("button", {
			disabled: lesson.isLocked,
			onClick: () => onLessonSelect(lesson),
			className: cn("w-full flex items-center justify-between p-3 rounded-lg text-left transition-all group", lesson.isActive ? "bg-blue-600/10 border border-blue-500/20 text-blue-400" : "hover:bg-slate-800/50 text-slate-400", lesson.isLocked && "opacity-50 cursor-not-allowed"),
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [lesson.isCompleted ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-green-500" }) : lesson.isLocked ? /* @__PURE__ */ jsx(Lock, { className: "w-5 h-5 text-slate-600" }) : /* @__PURE__ */ jsx(PlayCircle, { className: cn("w-5 h-5", lesson.isActive ? "text-blue-500" : "text-slate-500 group-hover:text-blue-400") }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: cn("text-sm font-medium", lesson.isActive ? "text-slate-900" : "group-hover:text-slate-200"),
					children: lesson.title
				}), /* @__PURE__ */ jsx("p", {
					className: cn("text-xs", lesson.isActive ? "text-blue-700/70" : "text-slate-500"),
					children: lesson.duration
				})] })]
			}), /* @__PURE__ */ jsx(ChevronRight, { className: cn("w-4 h-4 transition-transform", lesson.isActive ? "rotate-90 text-blue-500" : "text-slate-600 group-hover:translate-x-1") })]
		}, lesson.id))
	});
};
//#endregion
//#region app/routes/course.$id.tsx
var course_$id_exports = /* @__PURE__ */ __exportAll({ default: () => CourseDetails });
function CourseDetails() {
	const { id } = useParams();
	const isMounted = useMounted();
	const [user, setUser] = useState(null);
	const [currentLesson, setCurrentLesson] = useState("lesson-1");
	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedUser = localStorage.getItem("lumina_user");
			if (storedUser) setUser(JSON.parse(storedUser));
		}
	}, []);
	user?.id;
	user?.role;
	const lessons = [
		{
			id: "lesson-1",
			title: "01. Introduction to Go Concurrency",
			duration: "12:45",
			isCompleted: true,
			isLocked: false,
			isActive: currentLesson === "lesson-1",
			video: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
		},
		{
			id: "lesson-2",
			title: "02. Understanding Channels and Select",
			duration: "18:20",
			isCompleted: false,
			isLocked: false,
			isActive: currentLesson === "lesson-2",
			video: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
		},
		{
			id: "lesson-3",
			title: "03. Advanced Worker Pool Patterns",
			duration: "24:15",
			isCompleted: false,
			isLocked: false,
			isActive: currentLesson === "lesson-3",
			video: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
		},
		{
			id: "lesson-4",
			title: "04. Real-time Systems with WebSockets",
			duration: "32:10",
			isCompleted: false,
			isLocked: true,
			isActive: currentLesson === "lesson-4",
			video: ""
		},
		{
			id: "lesson-5",
			title: "05. PDF Manipulation at Scale",
			duration: "15:50",
			isCompleted: false,
			isLocked: true,
			isActive: currentLesson === "lesson-5",
			video: ""
		}
	];
	const activeLesson = lessons.find((l) => l.id === currentLesson) || lessons[0];
	const videoJsOptions = {
		autoplay: true,
		controls: true,
		responsive: true,
		fluid: true,
		sources: [{
			src: activeLesson.video,
			type: "application/x-mpegURL"
		}]
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-slate-50 font-sans pb-20 text-slate-900",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "bg-[#001a33] text-white pt-16 pb-16 relative overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none" }), /* @__PURE__ */ jsx("div", {
				className: "container relative z-10",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-6",
					children: [/* @__PURE__ */ jsxs(Link, {
						to: "/courses",
						className: "flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors w-fit font-semibold",
						children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" }), /* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: "Explore all courses"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col lg:flex-row lg:items-center justify-between gap-8",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "space-y-6 max-w-4xl",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-3",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20",
											children: "Engineering"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-slate-500 font-bold",
											children: "•"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-1.5 text-slate-300 text-sm font-medium",
											children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-green-400" }), /* @__PURE__ */ jsx("span", { children: "Prototype Ready" })]
										})
									]
								}),
								/* @__PURE__ */ jsxs("h1", {
									className: "text-4xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white",
									children: [
										"Mastering Go ",
										/* @__PURE__ */ jsx("span", {
											className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400",
											children: "Concurrency"
										}),
										" Patterns"
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-slate-300 text-xl leading-relaxed max-w-3xl font-medium opacity-90",
									children: "Build highly scalable, industrial-grade systems using goroutines, channels, and advanced synchronization architectures."
								})
							]
						}), /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4" })]
					})]
				})
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "container mt-10",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col lg:flex-row gap-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex-1 space-y-10",
					children: [/* @__PURE__ */ jsx("div", {
						className: "bg-black rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-slate-200 aspect-video",
						children: isMounted ? /* @__PURE__ */ jsx(VideoPlayer, { options: videoJsOptions }, currentLesson) : /* @__PURE__ */ jsx("div", {
							className: "w-full h-full flex items-center justify-center bg-slate-900 text-slate-500 italic",
							children: "Initializing secure player..."
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4 mb-8 border-b border-slate-100 pb-6",
							children: [
								/* @__PURE__ */ jsx("button", {
									className: "text-blue-600 font-bold text-lg border-b-2 border-blue-600 pb-1",
									children: "Overview"
								}),
								/* @__PURE__ */ jsx("button", {
									className: "text-slate-400 font-bold text-lg hover:text-slate-600 transition-colors",
									children: "Resources"
								}),
								/* @__PURE__ */ jsx("button", {
									className: "text-slate-400 font-bold text-lg hover:text-slate-600 transition-colors",
									children: "Q&A"
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ jsxs("h3", {
									className: "text-2xl font-bold text-slate-900",
									children: ["Current Lesson: ", activeLesson.title]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-slate-600 leading-relaxed",
									children: "This is a prototype view. In the final version, the video content is served via adaptive HLS streaming from Cloudflare R2, with progress synchronized in real-time via WebSockets to a Go backend."
								}),
								/* @__PURE__ */ jsx("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-4 pt-4",
									children: [
										"Master CSP & primitive sync",
										"Worker Pool architectures",
										"Pipeline & Fan-out/Fan-in patterns",
										"Context management at scale",
										"Real-time WebSocket state sync",
										"Memory-safe concurrency in Go"
									].map((feat, i) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-green-500 shrink-0 mt-0.5" }), /* @__PURE__ */ jsx("span", {
											className: "text-slate-700 font-medium",
											children: feat
										})]
									}, i))
								})
							]
						})]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "w-full lg:w-[400px] space-y-8",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 h-fit",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between mb-6",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "font-extrabold text-xl text-slate-900",
									children: "Course Content"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg",
									children: "20% DONE"
								})]
							}), /* @__PURE__ */ jsx(LessonList, {
								lessons,
								onLessonSelect: (l) => setCurrentLesson(l.id)
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100",
							children: [/* @__PURE__ */ jsxs("h3", {
								className: "font-extrabold text-xl text-slate-900 mb-6 flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-blue-600" }), "Lesson Materials"]
							}), /* @__PURE__ */ jsx("div", {
								className: "p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-500/30 transition-all text-slate-900",
								children: /* @__PURE__ */ jsx("div", {
									className: "flex items-center justify-between opacity-50 cursor-not-allowed",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500",
											children: /* @__PURE__ */ jsx(Download, { className: "w-5 h-5" })
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-sm font-bold text-slate-800",
											children: "Concurrency-Guide.pdf"
										}), /* @__PURE__ */ jsx("p", {
											className: "text-[10px] text-slate-500 font-medium italic",
											children: "Backend unavailable in prototype"
										})] })]
									})
								})
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bg-blue-600 rounded-[32px] p-8 text-white shadow-xl shadow-blue-500/20",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 mb-4",
								children: [/* @__PURE__ */ jsx(Activity, { className: "w-6 h-6 text-blue-200" }), /* @__PURE__ */ jsx("h3", {
									className: "font-extrabold text-xl",
									children: "Lumina Engine"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex justify-between items-center text-sm border-b border-white/10 pb-3",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-blue-100 opacity-80",
										children: "Prototype Mode"
									}), /* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-2 font-mono",
										children: ["Stand-alone ", /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-green-400" })]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex justify-between items-center text-sm",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-blue-100 opacity-80",
										children: "Frontend Frame"
									}), /* @__PURE__ */ jsx("span", {
										className: "font-mono text-[10px]",
										children: "Remix Framework"
									})]
								})]
							})]
						})
					]
				})]
			})
		})]
	});
}
//#endregion
//#region app/routes/contact.tsx
var contact_exports = /* @__PURE__ */ __exportAll({ default: () => Contact });
function Contact() {
	return /* @__PURE__ */ jsx("div", {
		className: "contact-area pt-100 pb-100",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container",
			children: [/* @__PURE__ */ jsx("div", {
				className: "row",
				children: /* @__PURE__ */ jsx("div", {
					className: "col-lg-12",
					children: /* @__PURE__ */ jsxs("div", {
						className: "section-title text-center mb-50",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-center mb-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "section-title-shape mr-2",
								children: /* @__PURE__ */ jsx("img", {
									src: "/lumina-assets/images/resource/section-shape.png",
									alt: ""
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "section-sub-title mb-0",
								children: /* @__PURE__ */ jsx("h4", {
									className: "mb-0",
									children: "Contact Us"
								})
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "section-main-title",
							children: /* @__PURE__ */ jsx("h2", { children: "Get In Touch With Us" })
						})]
					})
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "row align-items-center",
				children: [/* @__PURE__ */ jsx("div", {
					className: "col-lg-6",
					children: /* @__PURE__ */ jsx("div", {
						className: "contact-thumb",
						children: /* @__PURE__ */ jsx("img", {
							src: "/lumina-assets/images/resource/contact.png",
							alt: "",
							onError: (e) => {
								e.target.src = "/lumina-assets/images/resource/about.png";
							}
						})
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "col-lg-6",
					children: /* @__PURE__ */ jsx("div", {
						className: "contact-form-box",
						children: /* @__PURE__ */ jsx("form", {
							action: "#",
							children: /* @__PURE__ */ jsxs("div", {
								className: "row",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "col-lg-6",
										children: /* @__PURE__ */ jsx("div", {
											className: "from-box",
											children: /* @__PURE__ */ jsx("input", {
												type: "text",
												placeholder: "Your Name",
												required: true
											})
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "col-lg-6",
										children: /* @__PURE__ */ jsx("div", {
											className: "from-box",
											children: /* @__PURE__ */ jsx("input", {
												type: "email",
												placeholder: "Your Email",
												required: true
											})
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "col-lg-12",
										children: /* @__PURE__ */ jsx("div", {
											className: "from-box",
											children: /* @__PURE__ */ jsx("input", {
												type: "text",
												placeholder: "Subject",
												required: true
											})
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "col-lg-12",
										children: /* @__PURE__ */ jsx("div", {
											className: "from-box",
											children: /* @__PURE__ */ jsx("textarea", {
												name: "message",
												placeholder: "Message",
												required: true
											})
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "col-lg-12",
										children: /* @__PURE__ */ jsx("div", {
											className: "contact-btn",
											children: /* @__PURE__ */ jsxs("button", {
												type: "submit",
												className: "nest-btn",
												children: [
													/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
													/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
													/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
													/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
													/* @__PURE__ */ jsx("span", {
														className: "nest-btn__text",
														children: "Send Message"
													})
												]
											})
										})
									})
								]
							})
						})
					})
				})]
			})]
		})
	});
}
//#endregion
//#region app/routes/courses.tsx
var courses_exports = /* @__PURE__ */ __exportAll({ default: () => Courses });
function Courses() {
	return /* @__PURE__ */ jsx("div", {
		className: "course-area pt-100 pb-100 bg-white",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container",
			children: [/* @__PURE__ */ jsx("div", {
				className: "row",
				children: /* @__PURE__ */ jsx("div", {
					className: "col-lg-12",
					children: /* @__PURE__ */ jsxs("div", {
						className: "section-title text-center mb-50",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-center mb-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "section-title-shape mr-2",
								children: /* @__PURE__ */ jsx("img", {
									src: "/lumina-assets/images/resource/section-shape.png",
									alt: ""
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "section-sub-title mb-0",
								children: /* @__PURE__ */ jsx("h4", {
									className: "mb-0 text-blue-600",
									children: "Our Courses"
								})
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "section-main-title",
							children: /* @__PURE__ */ jsx("h2", {
								className: "text-slate-900",
								children: "Explore Professional Courses"
							})
						})]
					})
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "row",
				children: [
					{
						title: "The Complete Salesforce Classic Certification",
						author: "Kevin Martin",
						lessons: 22,
						duration: "1 hr 17 min",
						price: "$45.00",
						img: "course1.png"
					},
					{
						title: "Foundation Course to Understand Softwere",
						author: "Gus Atkinson",
						lessons: 22,
						duration: "1 hr 17 min",
						price: "$45.00",
						img: "course2.png"
					},
					{
						title: "Introduction to Web Development with React",
						author: "Jessica Brown",
						lessons: 22,
						duration: "1 hr 17 min",
						price: "$45.00",
						img: "course3.png"
					},
					{
						title: "Mastering Go Concurrency Patterns",
						author: "Serhat Kilbas",
						lessons: 15,
						duration: "2 hr 30 min",
						price: "$55.00",
						img: "course4.png"
					},
					{
						title: "Advanced Docker & Kubernetes for DevOps",
						author: "David Smith",
						lessons: 30,
						duration: "4 hr 10 min",
						price: "$65.00",
						img: "course5.png"
					},
					{
						title: "Full Stack Development with Gin & React",
						author: "Emily Davis",
						lessons: 25,
						duration: "3 hr 45 min",
						price: "$50.00",
						img: "course6.png"
					}
				].map((course, i) => /* @__PURE__ */ jsx("div", {
					className: "col-lg-4 col-md-6 mb-30",
					children: /* @__PURE__ */ jsxs("div", {
						className: "course-single-box shadow-sm hover:shadow-lg transition-all rounded-2xl overflow-hidden border border-slate-100",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "course-thumb",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: `/lumina-assets/images/course/${course.img}`,
									alt: course.title,
									onError: (e) => {
										e.target.src = "/lumina-assets/images/course/course1.png";
									}
								}),
								/* @__PURE__ */ jsx("img", {
									src: `/lumina-assets/images/course/${course.img}`,
									alt: course.title,
									onError: (e) => {
										e.target.src = "/lumina-assets/images/course/course1.png";
									}
								}),
								/* @__PURE__ */ jsx("div", {
									className: "course-icon",
									children: /* @__PURE__ */ jsx("i", { className: "bi bi-heart" })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "course-rating",
									children: [/* @__PURE__ */ jsx("div", {
										className: "course-admin",
										children: /* @__PURE__ */ jsx("div", {
											className: "course-shape-title",
											children: /* @__PURE__ */ jsx("h4", {
												className: "text-white",
												children: course.author
											})
										})
									}), /* @__PURE__ */ jsxs("div", {
										className: "course-star",
										children: [
											/* @__PURE__ */ jsx("i", { className: "bi bi-star-fill text-yellow-400" }),
											/* @__PURE__ */ jsx("i", { className: "bi bi-star-fill text-yellow-400" }),
											/* @__PURE__ */ jsx("i", { className: "bi bi-star-fill text-yellow-400" }),
											/* @__PURE__ */ jsx("i", { className: "bi bi-star-fill text-yellow-400" }),
											/* @__PURE__ */ jsx("i", { className: "bi bi-star-fill text-yellow-400" })
										]
									})]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "course-content p-6",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "course-meta flex items-center gap-4 text-slate-500 text-sm mb-3",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ jsx("i", { className: "bi bi-book text-blue-600" }),
											" ",
											course.lessons,
											" Lesson"
										]
									}), /* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ jsx("i", { className: "bi bi-clock text-blue-600" }),
											" ",
											course.duration
										]
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "course-title",
									children: /* @__PURE__ */ jsx("h4", {
										className: "text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors mb-4",
										children: /* @__PURE__ */ jsx(Link, {
											to: "/course/go-concurrency",
											children: course.title
										})
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "course-bottom flex items-center justify-between border-t border-slate-50 pt-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "course-price text-2xl font-bold text-blue-600",
										children: /* @__PURE__ */ jsx("span", { children: course.price })
									}), /* @__PURE__ */ jsx("div", {
										className: "course-cart",
										children: /* @__PURE__ */ jsxs(Link, {
											to: "/course/go-concurrency",
											className: "text-slate-700 font-semibold hover:text-blue-600 flex items-center gap-1 text-sm",
											children: [/* @__PURE__ */ jsx("i", { className: "bi bi-play-fill" }), " Start Learning"]
										})
									})]
								})
							]
						})]
					})
				}, i))
			})]
		})
	});
}
//#endregion
//#region app/components/AboutIllustration.tsx
var AboutIllustration = () => {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative w-full aspect-square bg-blue-50 rounded-[40px] overflow-hidden flex items-center justify-center shadow-inner",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full -mr-20 -mt-20 blur-3xl" }),
			/* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/50 rounded-full -ml-20 -mb-20 blur-3xl" }),
			/* @__PURE__ */ jsxs("svg", {
				width: "80%",
				height: "80%",
				viewBox: "0 0 400 400",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				className: "relative z-10 drop-shadow-2xl",
				children: [
					/* @__PURE__ */ jsx("rect", {
						x: "60",
						y: "80",
						width: "280",
						height: "200",
						rx: "20",
						fill: "#1e293b"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "75",
						y: "95",
						width: "250",
						height: "150",
						rx: "10",
						fill: "#334155"
					}),
					/* @__PURE__ */ jsx("circle", {
						cx: "200",
						cy: "170",
						r: "30",
						fill: "#3b82f6"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M215 170L192.5 182.99L192.5 157.01L215 170Z",
						fill: "white"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "75",
						y: "255",
						width: "100",
						height: "8",
						rx: "4",
						fill: "#475569"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "185",
						y: "255",
						width: "40",
						height: "8",
						rx: "4",
						fill: "#3b82f6"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "100",
						y: "280",
						width: "200",
						height: "40",
						rx: "4",
						fill: "#4f46e5"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "100",
						y: "280",
						width: "30",
						height: "40",
						fill: "#4338ca"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "135",
						y: "295",
						width: "140",
						height: "4",
						rx: "2",
						fill: "#818cf8",
						opacity: "0.5"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "120",
						y: "250",
						width: "180",
						height: "35",
						rx: "4",
						fill: "#2563eb"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "120",
						y: "250",
						width: "30",
						height: "35",
						fill: "#1d4ed8"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "155",
						y: "262",
						width: "120",
						height: "4",
						rx: "2",
						fill: "#60a5fa",
						opacity: "0.5"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "140",
						y: "220",
						width: "160",
						height: "35",
						rx: "4",
						fill: "#0ea5e9"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "140",
						y: "220",
						width: "30",
						height: "35",
						fill: "#0284c7"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "175",
						y: "232",
						width: "100",
						height: "4",
						rx: "2",
						fill: "#7dd3fc",
						opacity: "0.5"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "310",
						y: "50",
						width: "50",
						height: "50",
						rx: "12",
						fill: "white",
						className: "animate-bounce",
						style: { animationDuration: "3s" }
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M325 65L320 75L325 85M345 65L350 75L345 85",
						stroke: "#3b82f6",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "40",
						y: "200",
						width: "40",
						height: "40",
						rx: "10",
						fill: "white",
						className: "animate-pulse"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M60 212L62.4721 217.008L68 217.812L64 221.71L64.9443 227.248L60 224.652L55.0557 227.248L56 221.71L52 217.812L57.5279 217.008L60 212Z",
						fill: "#fbbf24"
					}),
					/* @__PURE__ */ jsx("rect", {
						x: "300",
						y: "280",
						width: "60",
						height: "60",
						rx: "15",
						fill: "white",
						className: "animate-bounce",
						style: { animationDuration: "4s" }
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M330 295L310 305L330 315L350 305L330 295Z",
						fill: "#1e293b"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M315 308V318C315 318 320 323 330 323C340 323 345 318 345 318V308",
						stroke: "#1e293b",
						strokeWidth: "2"
					})
				]
			})
		]
	});
};
//#endregion
//#region app/routes/_index.tsx
var _index_exports = /* @__PURE__ */ __exportAll({ default: () => Home });
function Home() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("div", {
			className: "banner-area",
			children: /* @__PURE__ */ jsx("div", {
				className: "slider_list",
				children: /* @__PURE__ */ jsxs("div", {
					className: "slider-area d-flex align-items-center",
					style: {
						backgroundColor: "#001a33",
						minHeight: "550px"
					},
					children: [/* @__PURE__ */ jsxs("div", {
						className: "slider-shape-area",
						children: [/* @__PURE__ */ jsx("div", {
							className: "baner-shape1 bounce-animate",
							children: /* @__PURE__ */ jsx("img", {
								src: "/lumina-assets/images/slider/slider-shape.png",
								alt: ""
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "baner-shape2 bounce-animate",
							children: /* @__PURE__ */ jsx("img", {
								src: "/lumina-assets/images/slider/slider-shape2.png",
								alt: ""
							})
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "container",
						children: /* @__PURE__ */ jsxs("div", {
							className: "row align-items-center",
							children: [/* @__PURE__ */ jsx("div", {
								className: "col-lg-8",
								children: /* @__PURE__ */ jsxs("div", {
									className: "slider-content",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "slider-sub-title",
											children: /* @__PURE__ */ jsx("h4", {
												className: "text-blue-400",
												children: "100% Satisfaction Guarantee"
											})
										}),
										/* @__PURE__ */ jsx("div", {
											className: "slider-main-title",
											children: /* @__PURE__ */ jsx("h1", {
												className: "text-white",
												children: "Learn Skills From Our Top Instructors"
											})
										}),
										/* @__PURE__ */ jsx("div", {
											className: "main-btn slider1 mt-4",
											children: /* @__PURE__ */ jsxs(Link, {
												to: "/auth",
												className: "nest-btn slider1",
												children: [
													/* @__PURE__ */ jsx("span", { className: "nest-btn__shape slider" }),
													/* @__PURE__ */ jsx("span", { className: "nest-btn__shape slider" }),
													/* @__PURE__ */ jsx("span", { className: "nest-btn__shape slider" }),
													/* @__PURE__ */ jsx("span", { className: "nest-btn__shape slider" }),
													/* @__PURE__ */ jsx("span", {
														className: "nest-btn__text",
														children: "Get Started"
													})
												]
											})
										})
									]
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "col-lg-4",
								children: /* @__PURE__ */ jsx("div", {
									className: "slider-thumb",
									children: /* @__PURE__ */ jsx("img", {
										src: "/lumina-assets/images/slider/slider-thumb.png",
										alt: ""
									})
								})
							})]
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "catagories-area pt-100 pb-100 bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx("div", {
					className: "row",
					children: /* @__PURE__ */ jsx("div", {
						className: "col-lg-12",
						children: /* @__PURE__ */ jsxs("div", {
							className: "section-title",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center mb-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "section-title-shape mr-2",
									children: /* @__PURE__ */ jsx("img", {
										src: "/lumina-assets/images/resource/section-shape.png",
										alt: ""
									})
								}), /* @__PURE__ */ jsx("div", {
									className: "section-sub-title mb-0",
									children: /* @__PURE__ */ jsx("h4", {
										className: "mb-0 text-blue-600",
										children: "Browse Categories"
									})
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "section-main-title",
								children: /* @__PURE__ */ jsx("h2", {
									className: "text-slate-900",
									children: "Top Courses Categories"
								})
							})]
						})
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "row",
					children: [
						{
							title: "Online Course",
							img: "catagories1.png"
						},
						{
							title: "Web Design",
							img: "catagories2.png"
						},
						{
							title: "Graphic Design",
							img: "catagories3.png"
						},
						{
							title: "Art & Humanities",
							img: "catagories4.png"
						},
						{
							title: "Mobile Application",
							img: "catagories5.png"
						},
						{
							title: "Development",
							img: "catagories6.png"
						}
					].map((cat, i) => /* @__PURE__ */ jsx("div", {
						className: "col-lg-2 col-md-4 col-sm-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "catagories-single-box",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "catagories-thumb",
								children: [/* @__PURE__ */ jsx("img", {
									src: `/lumina-assets/images/catagories/${cat.img}`,
									alt: cat.title
								}), /* @__PURE__ */ jsx("div", {
									className: "catagories-text",
									children: /* @__PURE__ */ jsx("h4", { children: "Visit" })
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "catagories-title",
								children: /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, {
									to: "/courses",
									className: "text-slate-800 hover:text-blue-600",
									children: cat.title
								}) })
							})]
						})
					}, i))
				})]
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "about-area pt-100 pb-100 bg-slate-50",
			children: /* @__PURE__ */ jsx("div", {
				className: "container",
				children: /* @__PURE__ */ jsxs("div", {
					className: "row align-items-center",
					children: [/* @__PURE__ */ jsx("div", {
						className: "col-lg-6",
						children: /* @__PURE__ */ jsx("div", {
							className: "about-thumb relative",
							children: /* @__PURE__ */ jsx(AboutIllustration, {})
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "col-lg-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "about-content pl-lg-10",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "section-title",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center mb-4",
										children: [/* @__PURE__ */ jsx("div", {
											className: "section-title-shape mr-2",
											children: /* @__PURE__ */ jsx("img", {
												src: "/lumina-assets/images/resource/section-shape.png",
												alt: ""
											})
										}), /* @__PURE__ */ jsx("div", {
											className: "section-sub-title mb-0",
											children: /* @__PURE__ */ jsx("h4", {
												className: "mb-0 text-blue-600",
												children: "About Lumina"
											})
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "section-main-title",
										children: /* @__PURE__ */ jsx("h2", {
											className: "text-slate-900 leading-tight",
											children: "We Are Expert In Education Learning & LMS"
										})
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "about-text mt-6",
									children: /* @__PURE__ */ jsx("p", {
										className: "text-slate-600 text-lg",
										children: "Lumina leverages cutting-edge technology including Go, FFmpeg, and WebSockets to deliver a high-concurrency, real-time learning experience."
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "about-list mt-8",
									children: /* @__PURE__ */ jsxs("ul", {
										className: "space-y-4",
										children: [
											/* @__PURE__ */ jsxs("li", {
												className: "text-slate-700 flex items-center gap-3",
												children: [
													/* @__PURE__ */ jsx("i", { className: "bi bi-check-circle-fill text-blue-600 text-xl" }),
													" ",
													/* @__PURE__ */ jsx("span", { children: "Professional & Experienced Instructors" })
												]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "text-slate-700 flex items-center gap-3",
												children: [
													/* @__PURE__ */ jsx("i", { className: "bi bi-check-circle-fill text-blue-600 text-xl" }),
													" ",
													/* @__PURE__ */ jsx("span", { children: "Real-time Video Progress Sync" })
												]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "text-slate-700 flex items-center gap-3",
												children: [
													/* @__PURE__ */ jsx("i", { className: "bi bi-check-circle-fill text-blue-600 text-xl" }),
													" ",
													/* @__PURE__ */ jsx("span", { children: "Dynamic PDF Watermarking System" })
												]
											}),
											/* @__PURE__ */ jsxs("li", {
												className: "text-slate-700 flex items-center gap-3",
												children: [
													/* @__PURE__ */ jsx("i", { className: "bi bi-check-circle-fill text-blue-600 text-xl" }),
													" ",
													/* @__PURE__ */ jsx("span", { children: "Adaptive HLS Video Streaming" })
												]
											})
										]
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "main-btn mt-10",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/auth",
										className: "nest-btn px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all font-semibold text-center inline-block",
										children: "Get Started Now"
									})
								})
							]
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "counter-area py-20 bg-white",
			children: /* @__PURE__ */ jsx("div", {
				className: "container",
				children: /* @__PURE__ */ jsx("div", {
					className: "row",
					children: [
						{
							count: "30",
							label: "Expert Instructors",
							icon: "flaticon-graduation-cap"
						},
						{
							count: "120",
							label: "Online Courses",
							icon: "flaticon-book"
						},
						{
							count: "250",
							label: "Students Learning",
							icon: "flaticon-user"
						},
						{
							count: "100",
							label: "Satisfaction Rate",
							icon: "flaticon-star"
						}
					].map((stat, i) => /* @__PURE__ */ jsx("div", {
						className: "col-lg-3 col-md-6 mb-8 mb-lg-0",
						children: /* @__PURE__ */ jsxs("div", {
							className: "counter-single-box text-center",
							children: [/* @__PURE__ */ jsx("div", {
								className: "counter-icon mb-4",
								children: /* @__PURE__ */ jsx("i", { className: `${stat.icon} text-blue-600 text-5xl` })
							}), /* @__PURE__ */ jsxs("div", {
								className: "counter-content text-slate-800",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "counter text-5xl font-extrabold inline-block",
										children: stat.count
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-4xl font-bold ml-1 text-blue-600",
										children: "+"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-slate-500 mt-2 font-medium uppercase tracking-wider text-sm",
										children: stat.label
									})
								]
							})]
						})
					}, i))
				})
			})
		})
	] });
}
//#endregion
//#region app/routes/auth.tsx
var auth_exports = /* @__PURE__ */ __exportAll({ default: () => Auth });
function Auth() {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage(null);
		setTimeout(() => {
			const mockUser = {
				id: "usr_" + Math.random().toString(36).substring(7),
				email,
				fullName: isLogin ? "Demo User" : fullName,
				role: "instructor"
			};
			setMessage({
				text: isLogin ? "Login successful! Redirecting..." : "Account created successfully! Redirecting...",
				isError: false
			});
			localStorage.setItem("lumina_user", JSON.stringify(mockUser));
			localStorage.setItem("lumina_token", "prototype-token");
			setTimeout(() => {
				navigate("/course/go-concurrency");
			}, 1e3);
			setIsLoading(false);
		}, 800);
	};
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md w-full bg-white rounded-[32px] shadow-2xl shadow-blue-500/10 border border-slate-100 overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", {
				className: "p-8 pb-0 flex justify-center",
				children: /* @__PURE__ */ jsx(Link, {
					to: "/",
					children: /* @__PURE__ */ jsx(Logo, { size: 50 })
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "p-8 pt-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "text-center mb-10",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-3xl font-extrabold text-slate-900 tracking-tight",
							children: isLogin ? "Welcome Back" : "Create Account"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-slate-500 mt-2",
							children: "Prototype Mode: Any email/password will work."
						})]
					}),
					message && /* @__PURE__ */ jsx("div", {
						className: `mb-6 p-4 rounded-2xl text-sm font-medium border ${message.isError ? "bg-red-50 border-red-100 text-red-600" : "bg-green-50 border-green-100 text-green-600"}`,
						children: message.text
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						className: "space-y-5",
						children: [
							!isLogin && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-semibold text-slate-700 mb-1.5 ml-1",
								children: "Full Name"
							}), /* @__PURE__ */ jsx("input", {
								type: "text",
								value: fullName,
								onChange: (e) => setFullName(e.target.value),
								className: "w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400",
								placeholder: "John Doe",
								required: true
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-semibold text-slate-700 mb-1.5 ml-1",
								children: "Email Address"
							}), /* @__PURE__ */ jsx("input", {
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400",
								placeholder: "name@company.com",
								required: true
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "block text-sm font-semibold text-slate-700 mb-1.5 ml-1",
								children: "Password"
							}), /* @__PURE__ */ jsx("input", {
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400",
								placeholder: "••••••••",
								required: true
							})] }),
							/* @__PURE__ */ jsxs("button", {
								type: "submit",
								disabled: isLoading,
								className: `w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] flex items-center justify-center gap-2 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`,
								children: [isLoading && /* @__PURE__ */ jsxs("svg", {
									className: "animate-spin h-5 w-5 text-white",
									xmlns: "http://www.w3.org/2000/svg",
									fill: "none",
									viewBox: "0 0 24 24",
									children: [/* @__PURE__ */ jsx("circle", {
										className: "opacity-25",
										cx: "12",
										cy: "12",
										r: "10",
										stroke: "currentColor",
										strokeWidth: "4"
									}), /* @__PURE__ */ jsx("path", {
										className: "opacity-75",
										fill: "currentColor",
										d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									})]
								}), isLogin ? "Sign In" : "Sign Up"]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-8 pt-8 border-t border-slate-100 text-center",
						children: /* @__PURE__ */ jsxs("p", {
							className: "text-slate-500 text-sm",
							children: [isLogin ? "Don't have an account?" : "Already have an account?", /* @__PURE__ */ jsx("button", {
								onClick: () => {
									setIsLogin(!isLogin);
									setMessage(null);
								},
								className: "ml-1.5 font-bold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline",
								children: isLogin ? "Sign up for free" : "Sign in here"
							})]
						})
					})
				]
			})]
		})
	});
}
//#endregion
//#region \0virtual:remix/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-ZbKxnXS1.js",
		"imports": ["/assets/jsx-runtime-D4LBVaVM.js", "/assets/components-BZxyE8p9.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasErrorBoundary": false,
			"module": "/assets/root-DuASUci3.js",
			"imports": [
				"/assets/jsx-runtime-D4LBVaVM.js",
				"/assets/components-BZxyE8p9.js",
				"/assets/Logo-CNZPIbA0.js",
				"/assets/use-mounted-BlDlKlFr.js"
			],
			"css": ["/assets/root-Bvu5JjNW.css"]
		},
		"routes/course.$id": {
			"id": "routes/course.$id",
			"parentId": "root",
			"path": "course/:id",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasErrorBoundary": false,
			"module": "/assets/course._id-BUy0Zlhv.js",
			"imports": [
				"/assets/jsx-runtime-D4LBVaVM.js",
				"/assets/components-BZxyE8p9.js",
				"/assets/use-mounted-BlDlKlFr.js"
			],
			"css": ["/assets/course-DKGaidlz.css"]
		},
		"routes/contact": {
			"id": "routes/contact",
			"parentId": "root",
			"path": "contact",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasErrorBoundary": false,
			"module": "/assets/contact-BVlzZahW.js",
			"imports": ["/assets/jsx-runtime-D4LBVaVM.js"],
			"css": []
		},
		"routes/courses": {
			"id": "routes/courses",
			"parentId": "root",
			"path": "courses",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasErrorBoundary": false,
			"module": "/assets/courses-BX-O7qIa.js",
			"imports": ["/assets/jsx-runtime-D4LBVaVM.js", "/assets/components-BZxyE8p9.js"],
			"css": []
		},
		"routes/_index": {
			"id": "routes/_index",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasErrorBoundary": false,
			"module": "/assets/_index-DVh0uU-I.js",
			"imports": ["/assets/jsx-runtime-D4LBVaVM.js", "/assets/components-BZxyE8p9.js"],
			"css": []
		},
		"routes/auth": {
			"id": "routes/auth",
			"parentId": "root",
			"path": "auth",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasErrorBoundary": false,
			"module": "/assets/auth-BCv1vd5I.js",
			"imports": [
				"/assets/jsx-runtime-D4LBVaVM.js",
				"/assets/components-BZxyE8p9.js",
				"/assets/Logo-CNZPIbA0.js"
			],
			"css": []
		}
	},
	"url": "/assets/manifest-0842889c.js",
	"version": "0842889c"
};
//#endregion
//#region \0virtual:remix/server-build
/**
* `mode` is only relevant for the old Remix compiler but
* is included here to satisfy the `ServerBuild` typings.
*/
var mode = "production";
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = {
	"v3_fetcherPersist": true,
	"v3_relativeSplatPath": false,
	"v3_throwAbortReason": true,
	"v3_routeConfig": false,
	"v3_singleFetch": true,
	"v3_lazyRouteDiscovery": true,
	"unstable_optimizeDeps": false
};
var isSpaMode = false;
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/course.$id": {
		id: "routes/course.$id",
		parentId: "root",
		path: "course/:id",
		index: void 0,
		caseSensitive: void 0,
		module: course_$id_exports
	},
	"routes/contact": {
		id: "routes/contact",
		parentId: "root",
		path: "contact",
		index: void 0,
		caseSensitive: void 0,
		module: contact_exports
	},
	"routes/courses": {
		id: "routes/courses",
		parentId: "root",
		path: "courses",
		index: void 0,
		caseSensitive: void 0,
		module: courses_exports
	},
	"routes/_index": {
		id: "routes/_index",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: _index_exports
	},
	"routes/auth": {
		id: "routes/auth",
		parentId: "root",
		path: "auth",
		index: void 0,
		caseSensitive: void 0,
		module: auth_exports
	}
};
//#endregion
export { server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, mode, publicPath, routes };
