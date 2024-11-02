export async function GET(req) {
    const banners = [
      {
        id: 1,
        image: "/images/banner1.jpg", // استخدم المسار الصحيح
        title: "Summer Collection",
        description: "Get the best deals for summer fashion!",
      },
      {
        id: 2,
        image: "/images/banner2.jpg", // استخدم المسار الصحيح
        title: "Winter Collection",
        description: "Warm up your wardrobe with our winter collection.",
      },
      {
        id: 3,
        image: "/images/banner3.jpg", // استخدم المسار الصحيح
        title: "Spring Sale",
        description: "Don’t miss out on our spring sale! Up to 50% off.",
      },
    ];
  
    return new Response(JSON.stringify(banners), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  