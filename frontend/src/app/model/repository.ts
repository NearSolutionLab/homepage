export function getSolutionImage(isMobile: boolean) {
  return [
    {
      src: isMobile ? "m-img-nearview.png" : "img-nearview.jpg",
      name: "home.text.nearView",
      info: "",
      routing: "/solution/nearView",
    },
    {
      src: isMobile ? "m-img-smart.png" : "img-smart.jpg",
      name: "home.text.ptlSystem",
      info: "",
      routing: "/solution/ptlSystem",
    },
    {
      src: isMobile ? "m-img-dynamic.png" : "img-dynamic.jpg",
      name: "home.text.dynamicPut",
      info: "",
      routing: "/solution/dynamicPut",
    },
    {
      src: isMobile ? "m-img-wes.png" : "img-wes.jpg",
      name: "home.text.wes",
      info: "",
      routing: "/solution/wes",
    },
    {
      src: isMobile ? "m-img-picking.png" : "img-picking.jpg",
      name: "home.text.picking",
      info: "",
      routing: "/solution/picking",
    },
  ];
}

export function getBusinessImage(isMobile: boolean) {
  return [
    {
      src: isMobile
        ? "assets/image/m-img-main-01.png"
        : "assets/image/img-main-01.jpg",
      routing: "/business/optimization",
    },
    {
      src: isMobile
        ? "assets/image/m-img-main-02.png"
        : "assets/image/img-main-02.jpg",
      routing: "/business/logiticsSystem",
    },
  ];
}
