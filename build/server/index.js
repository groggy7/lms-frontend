import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { Link, Links, Meta, Outlet, RemixServer, Scripts, ScrollRestoration } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Button } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Progress } from "@base-ui/react/progress";
import { Input } from "@base-ui/react/input";
import videojs from "video.js";
import { Activity, BookOpen, CheckCircle2, ChevronRight, Download, FileText, LayoutDashboard, Lock, LogOut, PlayCircle, Settings } from "lucide-react";
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
//#region app/components/estudy/Navbar.tsx
var Navbar = () => {
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
							children: /* @__PURE__ */ jsx("img", {
								src: "/estudy-assets/images/logo.png",
								alt: "Logo"
							})
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
									to: "/learning",
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
								to: "/learning?tab=dashboard",
								children: /* @__PURE__ */ jsx("i", { className: "bi bi-person-fill" })
							}) })
						] }), /* @__PURE__ */ jsx("div", {
							className: "main-btn",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/learning",
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
					children: /* @__PURE__ */ jsx("img", {
						src: "/estudy-assets/images/logo.png",
						alt: "Logo"
					})
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
//#region app/components/estudy/Footer.tsx
var Footer = () => {
	return /* @__PURE__ */ jsx("div", {
		className: "footer-area",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "footer-shape1 bounce-animate-slow",
					children: /* @__PURE__ */ jsx("img", {
						src: "/estudy-assets/images/footer/footer-shape-1.png",
						alt: ""
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "footer-shape2 bounce-animate-slow",
					children: /* @__PURE__ */ jsx("img", {
						src: "/estudy-assets/images/footer/footer-shape-2.png",
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
											children: /* @__PURE__ */ jsx("img", {
												src: "/estudy-assets/images/logo.png",
												alt: "Footer Logo"
											})
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
											to: "/learning",
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
													children: "info@estudy-lms.com"
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
											src: "/estudy-assets/images/footer/footer1.png",
											alt: ""
										}) }),
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("img", {
											src: "/estudy-assets/images/footer/footer2.png",
											alt: ""
										}) }),
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("img", {
											src: "/estudy-assets/images/footer/footer3.png",
											alt: ""
										}) }),
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("img", {
											src: "/estudy-assets/images/footer/footer4.png",
											alt: ""
										}) }),
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("img", {
											src: "/estudy-assets/images/footer/footer5.png",
											alt: ""
										}) }),
										/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("img", {
											src: "/estudy-assets/images/footer/footer6.png",
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
								children: "LMS Engine"
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
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	Layout: () => Layout,
	default: () => App,
	links: () => links
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
		href: "/estudy-assets/css/bootstrap.min.css"
	},
	{
		rel: "stylesheet",
		href: "/estudy-assets/css/owl.carousel.min.css"
	},
	{
		rel: "stylesheet",
		href: "/estudy-assets/css/animate.css"
	},
	{
		rel: "stylesheet",
		href: "/estudy-assets/css/all.min.css"
	},
	{
		rel: "stylesheet",
		href: "/estudy-assets/css/flaticon.css"
	},
	{
		rel: "stylesheet",
		href: "/estudy-assets/css/theme-default.css"
	},
	{
		rel: "stylesheet",
		href: "/estudy-assets/css/meanmenu.min.css"
	},
	{
		rel: "stylesheet",
		href: "/estudy-assets/css/owl.transitions.css"
	},
	{
		rel: "stylesheet",
		href: "/estudy-assets/venobox/venobox.css"
	},
	{
		rel: "stylesheet",
		href: "/estudy-assets/css/bootstrap-icons.css"
	},
	{
		rel: "stylesheet",
		href: "/estudy-assets/css/style.css"
	},
	{
		rel: "stylesheet",
		href: "/estudy-assets/css/dropdown.css"
	},
	{
		rel: "stylesheet",
		href: "/estudy-assets/css/responsive.css"
	},
	{
		rel: "icon",
		type: "image/png",
		sizes: "56x56",
		href: "/estudy-assets/images/fav-icon/icon.png"
	}
];
function Layout({ children }) {
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
												children: /* @__PURE__ */ jsx("img", {
													src: "/estudy-assets/images/logo.png",
													alt: "logo"
												})
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
													/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("i", { className: "bi bi-envelope" }), " info@estudy-lms.com"] })
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
			/* @__PURE__ */ jsx("div", {
				className: "prgoress_scrollup",
				children: /* @__PURE__ */ jsx("svg", {
					className: "progress-circle svg-content",
					width: "100%",
					height: "100%",
					viewBox: "-1 -1 102 102",
					children: /* @__PURE__ */ jsx("path", { d: "M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" })
				})
			}),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/vendor/jquery-3.6.2.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/popper.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/bootstrap.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/owl.carousel.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/jquery.counterup.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/waypoints.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/wow.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/imagesloaded.pkgd.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/venobox/venobox.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/animated-text.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/isotope.pkgd.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/jquery.meanmenu.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/jquery.scrollUp.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/jquery.barfiller.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/rangeslider.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/mixitup.min.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/theme.js" }),
			/* @__PURE__ */ jsx("script", { src: "/estudy-assets/js/script.js" }),
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
function App() {
	return /* @__PURE__ */ jsx(Outlet, {});
}
//#endregion
//#region app/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region app/components/ui/button.tsx
var buttonVariants = cva("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
			outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
			destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			icon: "size-8",
			"icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
			"icon-lg": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button$1({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ jsx(Button, {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region app/components/ui/progress.tsx
function Progress$1({ className, children, value, ...props }) {
	return /* @__PURE__ */ jsxs(Progress.Root, {
		value,
		"data-slot": "progress",
		className: cn("flex flex-wrap gap-3", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(ProgressTrack, { children: /* @__PURE__ */ jsx(ProgressIndicator, {}) })]
	});
}
function ProgressTrack({ className, ...props }) {
	return /* @__PURE__ */ jsx(Progress.Track, {
		className: cn("relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted", className),
		"data-slot": "progress-track",
		...props
	});
}
function ProgressIndicator({ className, ...props }) {
	return /* @__PURE__ */ jsx(Progress.Indicator, {
		"data-slot": "progress-indicator",
		className: cn("h-full bg-primary transition-all", className),
		...props
	});
}
//#endregion
//#region app/components/ui/input.tsx
function Input$1({ className, type, ...props }) {
	return /* @__PURE__ */ jsx(Input, {
		type,
		"data-slot": "input",
		className: cn("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
//#endregion
//#region app/components/ui/label.tsx
function Label({ className, ...props }) {
	return /* @__PURE__ */ jsx("label", {
		"data-slot": "label",
		className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
//#endregion
//#region app/components/ui/card.tsx
function Card({ className, size = "default", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card",
		"data-size": size,
		className: cn("group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-header",
		className: cn("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-title",
		className: cn("font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-content",
		className: cn("px-4 group-data-[size=sm]/card:px-3", className),
		...props
	});
}
function CardFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-footer",
		className: cn("flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3", className),
		...props
	});
}
//#endregion
//#region app/components/VideoUpload.tsx
var CHUNK_SIZE = 5 * 1024 * 1024;
var VideoUpload = () => {
	const [file, setFile] = useState(null);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const handleFileChange = (e) => {
		if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
	};
	const uploadFile = async () => {
		if (!file) return;
		setIsUploading(true);
		setUploadProgress(0);
		const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
		const uploadId = Math.random().toString(36).substring(7);
		for (let i = 0; i < totalChunks; i++) {
			const start = i * CHUNK_SIZE;
			const end = Math.min(file.size, start + CHUNK_SIZE);
			const chunk = file.slice(start, end);
			const formData = new FormData();
			formData.append("chunk", chunk);
			formData.append("chunkIndex", i.toString());
			formData.append("totalChunks", totalChunks.toString());
			formData.append("fileName", file.name);
			formData.append("uploadId", uploadId);
			try {
				if (!(await fetch("http://localhost:8080/upload", {
					method: "POST",
					body: formData
				})).ok) throw new Error("Upload failed");
				setUploadProgress(Math.round((i + 1) / totalChunks * 100));
			} catch (error) {
				console.error("Error uploading chunk:", error);
				setIsUploading(false);
				return;
			}
		}
		setIsUploading(false);
		alert("Upload complete!");
	};
	return /* @__PURE__ */ jsxs(Card, {
		className: "w-full max-w-md mx-auto mt-10 dark bg-slate-900 text-white",
		children: [
			/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, {
				className: "text-2xl font-bold",
				children: "Upload Video"
			}) }),
			/* @__PURE__ */ jsxs(CardContent, {
				className: "space-y-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid w-full items-center gap-1.5",
					children: [/* @__PURE__ */ jsx(Label, {
						htmlFor: "video-upload",
						children: "Choose a video file"
					}), /* @__PURE__ */ jsx(Input$1, {
						id: "video-upload",
						type: "file",
						accept: "video/*",
						onChange: handleFileChange,
						className: "bg-slate-800 border-slate-700"
					})]
				}), isUploading && /* @__PURE__ */ jsxs("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ jsx("span", { children: "Uploading..." }), /* @__PURE__ */ jsxs("span", { children: [uploadProgress, "%"] })]
					}), /* @__PURE__ */ jsx(Progress$1, {
						value: uploadProgress,
						className: "h-2"
					})]
				})]
			}),
			/* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(Button$1, {
				onClick: uploadFile,
				disabled: !file || isUploading,
				className: "w-full",
				children: isUploading ? "Uploading..." : "Start Upload"
			}) })
		]
	});
};
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
					className: cn("text-sm font-medium", lesson.isActive ? "text-slate-100" : "group-hover:text-slate-200"),
					children: lesson.title
				}), /* @__PURE__ */ jsx("p", {
					className: "text-xs text-slate-500",
					children: lesson.duration
				})] })]
			}), /* @__PURE__ */ jsx(ChevronRight, { className: cn("w-4 h-4 transition-transform", lesson.isActive ? "rotate-90 text-blue-500" : "text-slate-600 group-hover:translate-x-1") })]
		}, lesson.id))
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
//#region app/routes/learning.tsx
var learning_exports = /* @__PURE__ */ __exportAll({ default: () => Learning });
function Learning() {
	const isMounted = useMounted();
	const [userId] = useState("user-" + Math.random().toString(36).substring(7));
	const [activeTab, setActiveTab] = useState("learning");
	const [currentLesson, setCurrentLesson] = useState("lesson-1");
	const videoId = "sample-video-id";
	const wsRef = useRef(null);
	const lessons = [
		{
			id: "lesson-1",
			title: "01. Introduction to Go Concurrency",
			duration: "12:45",
			isCompleted: true,
			isLocked: false,
			isActive: currentLesson === "lesson-1"
		},
		{
			id: "lesson-2",
			title: "02. Understanding Channels and Select",
			duration: "18:20",
			isCompleted: false,
			isLocked: false,
			isActive: currentLesson === "lesson-2"
		},
		{
			id: "lesson-3",
			title: "03. Advanced Worker Pool Patterns",
			duration: "24:15",
			isCompleted: false,
			isLocked: false,
			isActive: currentLesson === "lesson-3"
		},
		{
			id: "lesson-4",
			title: "04. Real-time Systems with WebSockets",
			duration: "32:10",
			isCompleted: false,
			isLocked: true,
			isActive: currentLesson === "lesson-4"
		},
		{
			id: "lesson-5",
			title: "05. PDF Manipulation at Scale",
			duration: "15:50",
			isCompleted: false,
			isLocked: true,
			isActive: currentLesson === "lesson-5"
		}
	];
	useEffect(() => {
		if (!isMounted) return;
		const socket = new WebSocket("ws://localhost:8080/ws/progress");
		wsRef.current = socket;
		socket.onopen = () => console.log("WebSocket connected");
		return () => socket.close();
	}, [isMounted]);
	const handlePlayerReady = (player) => {
		player.on("timeupdate", () => {
			const currentTime = player.currentTime();
			if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) wsRef.current.send(JSON.stringify({
				userId,
				videoId,
				progress: currentTime
			}));
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex bg-slate-950 text-slate-100 overflow-hidden font-sans min-h-[calc(100vh-80px)]",
		children: [/* @__PURE__ */ jsxs("aside", {
			className: "w-64 border-r border-slate-900 bg-slate-950 flex flex-col shrink-0",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "p-6 border-b border-slate-900",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20",
							children: "L"
						}), /* @__PURE__ */ jsxs("span", {
							className: "font-bold text-xl tracking-tight",
							children: ["LMS ", /* @__PURE__ */ jsx("span", {
								className: "text-blue-500",
								children: "Engine"
							})]
						})]
					})
				}),
				/* @__PURE__ */ jsxs("nav", {
					className: "flex-1 p-4 space-y-2 mt-4",
					children: [
						/* @__PURE__ */ jsxs("button", {
							onClick: () => setActiveTab("learning"),
							className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "learning" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-400 hover:bg-slate-900"}`,
							children: [/* @__PURE__ */ jsx(BookOpen, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
								className: "font-medium text-sm",
								children: "Learning"
							})]
						}),
						/* @__PURE__ */ jsxs("button", {
							onClick: () => setActiveTab("dashboard"),
							className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "dashboard" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-400 hover:bg-slate-900"}`,
							children: [/* @__PURE__ */ jsx(LayoutDashboard, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
								className: "font-medium text-sm",
								children: "Upload Admin"
							})]
						}),
						/* @__PURE__ */ jsxs("button", {
							className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 transition-all",
							children: [/* @__PURE__ */ jsx(Settings, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
								className: "font-medium text-sm",
								children: "Settings"
							})]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "p-4 border-t border-slate-900",
					children: /* @__PURE__ */ jsxs("button", {
						className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all",
						children: [/* @__PURE__ */ jsx(LogOut, { className: "w-5 h-5" }), /* @__PURE__ */ jsx("span", {
							className: "font-medium text-sm",
							children: "Log Out"
						})]
					})
				})
			]
		}), /* @__PURE__ */ jsxs("main", {
			className: "flex-1 overflow-y-auto bg-slate-950 relative",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "h-16 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 text-sm text-slate-500",
					children: [
						/* @__PURE__ */ jsx("span", { children: "Courses" }),
						/* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" }),
						/* @__PURE__ */ jsx("span", {
							className: "text-slate-200",
							children: "Go Backend Engineering POC"
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800",
						children: [/* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse" }), /* @__PURE__ */ jsx("span", {
							className: "text-xs font-mono text-slate-400",
							children: "WS Connected"
						})]
					}), /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border border-slate-800" })]
				})]
			}), activeTab === "learning" ? /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex-1 p-8 lg:border-r border-slate-900",
					children: /* @__PURE__ */ jsxs("div", {
						className: "max-w-4xl mx-auto space-y-8",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-2xl aspect-video ring-1 ring-white/5",
								children: isMounted ? /* @__PURE__ */ jsx(VideoPlayer, {
									options: {
										autoplay: false,
										controls: true,
										responsive: true,
										fluid: true,
										sources: [{
											src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
											type: "application/x-mpegURL"
										}]
									},
									onReady: handlePlayerReady
								}) : /* @__PURE__ */ jsx("div", {
									className: "w-full h-full flex items-center justify-center bg-slate-900 text-slate-500",
									children: "Loading Player..."
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("h2", {
										className: "text-2xl font-bold tracking-tight",
										children: "Introduction to Go Concurrency"
									}), /* @__PURE__ */ jsx("div", {
										className: "flex items-center gap-2",
										children: /* @__PURE__ */ jsx("span", {
											className: "px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/20",
											children: "In Progress"
										})
									})]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-slate-400 leading-relaxed max-w-2xl",
									children: "Welcome to the first module of our high-concurrency learning series. In this session, we'll explore Go's runtime scheduler, the M:P:N model, and how to effectively manage goroutines at scale."
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid md:grid-cols-2 gap-6 pt-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "bg-slate-900/40 p-5 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all",
									children: [/* @__PURE__ */ jsxs("h3", {
										className: "font-semibold mb-4 flex items-center gap-2 text-blue-400",
										children: [/* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" }), "Lesson Materials"]
									}), /* @__PURE__ */ jsx("div", {
										className: "space-y-3",
										children: /* @__PURE__ */ jsx("a", {
											href: `http://localhost:8080/download/pdf?userId=${userId}`,
											className: "flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl group hover:border-blue-500/50 transition-all",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ jsx("div", {
													className: "w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500",
													children: /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" })
												}), /* @__PURE__ */ jsx("span", {
													className: "text-sm font-medium",
													children: "Concurrency-Handout.pdf"
												})]
											})
										})
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "bg-slate-900/40 p-5 rounded-2xl border border-slate-800",
									children: [/* @__PURE__ */ jsxs("h3", {
										className: "font-semibold mb-4 flex items-center gap-2 text-indigo-400",
										children: [/* @__PURE__ */ jsx(Activity, { className: "w-5 h-5" }), "Live Metrics"]
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-4",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center text-sm border-b border-slate-800/50 pb-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-slate-500 font-medium",
												children: "User ID"
											}), /* @__PURE__ */ jsxs("span", {
												className: "text-slate-300 font-mono text-xs",
												children: [userId.substring(0, 12), "..."]
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-center text-sm",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-slate-500 font-medium",
												children: "Session Sync"
											}), /* @__PURE__ */ jsx("span", {
												className: "text-slate-300",
												children: "Active"
											})]
										})]
									})]
								})]
							})
						]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "w-full lg:w-96 p-8 bg-slate-950/50 shrink-0 h-fit lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:sticky lg:top-16",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-6 flex items-center justify-between",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-bold text-lg",
							children: "Course Content"
						}), /* @__PURE__ */ jsx("span", {
							className: "text-xs font-mono text-blue-500",
							children: "20% Complete"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-6",
						children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs font-bold text-slate-500 uppercase tracking-widest mb-3",
							children: "Module 01: The Basics"
						}), /* @__PURE__ */ jsx(LessonList, {
							lessons,
							onLessonSelect: (l) => setCurrentLesson(l.id)
						})] })
					})]
				})]
			}) : /* @__PURE__ */ jsxs("div", {
				className: "p-8 max-w-4xl mx-auto space-y-12",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "bg-blue-600/10 border border-blue-500/20 p-8 rounded-2xl",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-2xl font-bold mb-2",
							children: "Upload Administration"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-slate-400 mb-6",
							children: "Internal dashboard for managing video uploads and transcoding queues."
						}),
						/* @__PURE__ */ jsx(VideoUpload, {})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid md:grid-cols-3 gap-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "bg-slate-900/50 p-6 rounded-2xl border border-slate-800",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "text-slate-500 text-sm font-medium mb-1",
								children: "Queue Size"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-3xl font-bold",
								children: "0"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bg-slate-900/50 p-6 rounded-2xl border border-slate-800",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "text-slate-500 text-sm font-medium mb-1",
								children: "Active Transcodes"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-3xl font-bold text-blue-500",
								children: "Idle"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bg-slate-900/50 p-6 rounded-2xl border border-slate-800",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "text-slate-500 text-sm font-medium mb-1",
								children: "Storage Usage"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-3xl font-bold text-indigo-500",
								children: "4.2 GB"
							})]
						})
					]
				})]
			})]
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
						children: [/* @__PURE__ */ jsx("div", {
							className: "section-sub-title",
							children: /* @__PURE__ */ jsx("h4", { children: "Contact Us" })
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
							src: "/estudy-assets/images/resource/contact.png",
							alt: "",
							onError: (e) => {
								e.target.src = "/estudy-assets/images/resource/about.png";
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
		className: "course-area pt-100 pb-100",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container",
			children: [/* @__PURE__ */ jsx("div", {
				className: "row",
				children: /* @__PURE__ */ jsx("div", {
					className: "col-lg-12",
					children: /* @__PURE__ */ jsxs("div", {
						className: "section-title text-center mb-50",
						children: [/* @__PURE__ */ jsx("div", {
							className: "section-sub-title",
							children: /* @__PURE__ */ jsx("h4", { children: "Our Courses" })
						}), /* @__PURE__ */ jsx("div", {
							className: "section-main-title",
							children: /* @__PURE__ */ jsx("h2", { children: "Explore Professional Courses" })
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
						className: "course-single-box",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "course-thumb",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: `/estudy-assets/images/course/${course.img}`,
									alt: course.title,
									onError: (e) => {
										e.target.src = "/estudy-assets/images/course/course1.png";
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
											children: /* @__PURE__ */ jsx("h4", { children: course.author })
										})
									}), /* @__PURE__ */ jsxs("div", {
										className: "course-star",
										children: [
											/* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" }),
											/* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" }),
											/* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" }),
											/* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" }),
											/* @__PURE__ */ jsx("i", { className: "bi bi-star-fill" })
										]
									})]
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "course-content",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "course-meta",
									children: [/* @__PURE__ */ jsxs("span", { children: [
										/* @__PURE__ */ jsx("i", { className: "bi bi-book" }),
										" ",
										course.lessons,
										" Lesson"
									] }), /* @__PURE__ */ jsxs("span", { children: [
										/* @__PURE__ */ jsx("i", { className: "bi bi-clock" }),
										" ",
										course.duration
									] })]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "course-title",
									children: /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, {
										to: "/learning",
										children: course.title
									}) })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "course-bottom",
									children: [/* @__PURE__ */ jsx("div", {
										className: "course-price",
										children: /* @__PURE__ */ jsx("span", { children: course.price })
									}), /* @__PURE__ */ jsx("div", {
										className: "course-cart",
										children: /* @__PURE__ */ jsxs(Link, {
											to: "/learning",
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
//#region app/routes/_index.tsx
var _index_exports = /* @__PURE__ */ __exportAll({ default: () => Home });
function Home() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("div", {
			className: "slider_list",
			children: /* @__PURE__ */ jsxs("div", {
				className: "slider-area d-flex align-items-center",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "slider-shape-area",
					children: [/* @__PURE__ */ jsx("div", {
						className: "baner-shape1 bounce-animate",
						children: /* @__PURE__ */ jsx("img", {
							src: "/estudy-assets/images/slider/slider-shape.png",
							alt: ""
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "baner-shape2 bounce-animate",
						children: /* @__PURE__ */ jsx("img", {
							src: "/estudy-assets/images/slider/slider-shape2.png",
							alt: ""
						})
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "container",
					children: /* @__PURE__ */ jsxs("div", {
						className: "row align-items-center",
						children: [/* @__PURE__ */ jsx("div", {
							className: "col-lg-6",
							children: /* @__PURE__ */ jsxs("div", {
								className: "slider-content",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "slider-sub-title",
										children: /* @__PURE__ */ jsx("h4", { children: "100% Satisfaction Guarantee" })
									}),
									/* @__PURE__ */ jsx("div", {
										className: "slider-main-title",
										children: /* @__PURE__ */ jsx("h1", { children: "Learn Skills From Our Top Instructors" })
									}),
									/* @__PURE__ */ jsx("div", {
										className: "main-btn slider1",
										children: /* @__PURE__ */ jsxs(Link, {
											to: "/courses",
											className: "nest-btn slider1",
											children: [
												/* @__PURE__ */ jsx("span", { className: "nest-btn__shape slider" }),
												/* @__PURE__ */ jsx("span", { className: "nest-btn__shape slider" }),
												/* @__PURE__ */ jsx("span", { className: "nest-btn__shape slider" }),
												/* @__PURE__ */ jsx("span", { className: "nest-btn__shape slider" }),
												/* @__PURE__ */ jsx("span", {
													className: "nest-btn__text",
													children: "Our Courses"
												})
											]
										})
									})
								]
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "col-lg-6",
							children: /* @__PURE__ */ jsx("div", {
								className: "slider-thumb",
								children: /* @__PURE__ */ jsx("img", {
									src: "/estudy-assets/images/slider/slider-thumb.png",
									alt: ""
								})
							})
						})]
					})
				})]
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "catagories-area",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container",
				children: [/* @__PURE__ */ jsx("div", {
					className: "row",
					children: /* @__PURE__ */ jsx("div", {
						className: "col-lg-12",
						children: /* @__PURE__ */ jsxs("div", {
							className: "section-title",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "section-title-shape",
									children: /* @__PURE__ */ jsx("img", {
										src: "/estudy-assets/images/resource/section-shape.png",
										alt: ""
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "section-sub-title",
									children: /* @__PURE__ */ jsx("h4", { children: "Browse Categories" })
								}),
								/* @__PURE__ */ jsx("div", {
									className: "section-main-title",
									children: /* @__PURE__ */ jsx("h2", { children: "Top Courses Categories" })
								})
							]
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
									src: `/estudy-assets/images/catagories/${cat.img}`,
									alt: cat.title
								}), /* @__PURE__ */ jsx("div", {
									className: "catagories-text",
									children: /* @__PURE__ */ jsx("h4", { children: "Visit" })
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "catagories-title",
								children: /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, {
									to: "/courses",
									children: cat.title
								}) })
							})]
						})
					}, i))
				})]
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "about-area pt-100 pb-100",
			children: /* @__PURE__ */ jsx("div", {
				className: "container",
				children: /* @__PURE__ */ jsxs("div", {
					className: "row align-items-center",
					children: [/* @__PURE__ */ jsx("div", {
						className: "col-lg-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "about-thumb",
							children: [/* @__PURE__ */ jsx("img", {
								src: "/estudy-assets/images/resource/about.png",
								alt: ""
							}), /* @__PURE__ */ jsx("div", {
								className: "about-shape bounce-animate",
								children: /* @__PURE__ */ jsx("img", {
									src: "/estudy-assets/images/resource/section-shape.png",
									alt: ""
								})
							})]
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "col-lg-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "about-content",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "section-title",
									children: [/* @__PURE__ */ jsx("div", {
										className: "section-sub-title",
										children: /* @__PURE__ */ jsx("h4", { children: "About Estudy" })
									}), /* @__PURE__ */ jsx("div", {
										className: "section-main-title",
										children: /* @__PURE__ */ jsx("h2", { children: "We Are Expert In Education Learning & LMS" })
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "about-text",
									children: /* @__PURE__ */ jsx("p", { children: "Our platform leverages cutting-edge technology including Go, FFmpeg, and WebSockets to deliver a high-concurrency, real-time learning experience." })
								}),
								/* @__PURE__ */ jsx("div", {
									className: "about-list",
									children: /* @__PURE__ */ jsxs("ul", { children: [
										/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("i", { className: "bi bi-check-circle-fill" }), " Professional & Experienced Instructors"] }),
										/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("i", { className: "bi bi-check-circle-fill" }), " Real-time Video Progress Sync"] }),
										/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("i", { className: "bi bi-check-circle-fill" }), " Dynamic PDF Watermarking System"] }),
										/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("i", { className: "bi bi-check-circle-fill" }), " Adaptive HLS Video Streaming"] })
									] })
								}),
								/* @__PURE__ */ jsx("div", {
									className: "main-btn",
									children: /* @__PURE__ */ jsxs(Link, {
										to: "/courses",
										className: "nest-btn",
										children: [
											/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
											/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
											/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
											/* @__PURE__ */ jsx("span", { className: "nest-btn__shape" }),
											/* @__PURE__ */ jsx("span", {
												className: "nest-btn__text",
												children: "Discover More"
											})
										]
									})
								})
							]
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "counter-area",
			children: /* @__PURE__ */ jsx("div", {
				className: "container",
				children: /* @__PURE__ */ jsx("div", {
					className: "row counter-bg",
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
						className: "col-lg-3 col-md-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "counter-single-box",
							children: [/* @__PURE__ */ jsx("div", {
								className: "counter-icon",
								children: /* @__PURE__ */ jsx("i", { className: stat.icon })
							}), /* @__PURE__ */ jsxs("div", {
								className: "counter-content",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "counter",
										children: stat.count
									}),
									/* @__PURE__ */ jsx("span", { children: "+" }),
									/* @__PURE__ */ jsx("p", { children: stat.label })
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
//#region \0virtual:remix/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-C-CviEvY.js",
		"imports": [
			"/assets/jsx-runtime-D9j7kzcp.js",
			"/assets/components-BhY48Jpy.js",
			"/assets/react-dom-DjHVfwz3.js"
		],
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
			"module": "/assets/root-B-TEfIJk.js",
			"imports": [
				"/assets/jsx-runtime-D9j7kzcp.js",
				"/assets/components-BhY48Jpy.js",
				"/assets/react-dom-DjHVfwz3.js"
			],
			"css": ["/assets/root-g46l9Ki7.css"]
		},
		"routes/learning": {
			"id": "routes/learning",
			"parentId": "root",
			"path": "learning",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasErrorBoundary": false,
			"module": "/assets/learning-Cwp3awyX.js",
			"imports": ["/assets/jsx-runtime-D9j7kzcp.js", "/assets/react-dom-DjHVfwz3.js"],
			"css": ["/assets/learning-DKGaidlz.css"]
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
			"module": "/assets/contact-DNTQa0wu.js",
			"imports": ["/assets/jsx-runtime-D9j7kzcp.js"],
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
			"module": "/assets/courses-_7LTmytK.js",
			"imports": [
				"/assets/jsx-runtime-D9j7kzcp.js",
				"/assets/components-BhY48Jpy.js",
				"/assets/react-dom-DjHVfwz3.js"
			],
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
			"module": "/assets/_index-DBoFWWL0.js",
			"imports": [
				"/assets/jsx-runtime-D9j7kzcp.js",
				"/assets/components-BhY48Jpy.js",
				"/assets/react-dom-DjHVfwz3.js"
			],
			"css": []
		}
	},
	"url": "/assets/manifest-a751356a.js",
	"version": "a751356a"
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
	"routes/learning": {
		id: "routes/learning",
		parentId: "root",
		path: "learning",
		index: void 0,
		caseSensitive: void 0,
		module: learning_exports
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
	}
};
//#endregion
export { server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, mode, publicPath, routes };
