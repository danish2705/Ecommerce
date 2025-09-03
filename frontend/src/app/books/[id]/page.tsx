"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import {
  Badge,
  CheckCircle2,
  Heart,
  Loader2,
  MapPin,
  MessageCircle,
  ShoppingCart,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const steps = [
  {
    step: "Step 1",
    title: "Seller posts an Ad",
    description: "Seller posts an ad on book kart to sell their used books.",
    image: { src: "/icons/ads.png", alt: "Post Ad" },
  },
  {
    step: "Step 2",
    title: "Buyer Pays Online",
    description:
      "Buyer makes an online payment to book kart to buy those books.",
    image: { src: "/icons/pay_online.png", alt: "Payment" },
  },
  {
    step: "Step 3",
    title: "Seller ships the books",
    description: "Seller then ships the books to the buyer",
    image: { src: "/icons/fast-delivery.png", alt: "Shipping" },
  },
];

const book = {
  _id: "1",
  images: [
    "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b25saW5lJTIwc2VsbCUyMGJvb2tzfGVufDB8fDB8fHww",
    "https://media.istockphoto.com/id/910384920/photo/kid-reading-near-locked-door.webp?a=1&b=1&s=612x612&w=0&k=20&c=J3FL4ZVORItw_bkLzlVo4WO-xUy22S7Qqbuq2xusNnc=",
  ],
  title: "The Alchemist",
  category: "Reading Books (Novels)",
  condition: "Excellent",
  classType: "B.Com",
  subject: "Fiction",
  price: 300,
  author: "Paulo Coelho",
  edition: "25th Anniversary Edition",
  description:
    "A philosophical book about a shepherd's journey to realize his dreams.",
  finalPrice: 250,
  shippingCharge: 50,
  paymentMode: "UPI",
  paymentDetails: {
    upiId: "example@upi",
  },
  createdAt: new Date("2024-01-01"),
  seller: { name: "John Doe", phoneNumber: "1234567890" },
};

export default function Id() {
  const params = useParams();
  const id = params.id;
  const [selectedImage, setSelectedImage] = useState(0);
  const router = useRouter();
  const [isAddToCart, setIsAddToCart] = useState(false);

  const handleAddToCart = (productId: string) => {};
  const handleAddToWishList = (productId: string) => {};
  const bookImage = book?.images || [];

  const calculateDiscount = (price: number, finalPrice: number): number => {
    if (price > finalPrice && price > 0) {
      return Math.round(((price - finalPrice) / price) * 100);
    }
    return 0;
  };

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">
            {" "}
            Home{" "}
          </Link>
          <span>/</span>
          <Link href="/books" className="text-primary hover:underline">
            Books
          </Link>
          <span>/</span>
          <span className="text-gray600">{book.category}</span>
          <span>/</span>
          <span className="text-gray600">{book.title}</span>
        </nav>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative h-[400px] overflow-hidden rounded-lg border bg-white shadow-md">
              <Image
                src={bookImage[selectedImage]}
                alt={book.title}
                fill
                className="object-content"
              />
              {calculateDiscount(book.price, book.finalPrice) > 0 && (
                <span className="absolute left-0 top-2 rounded-r-lg px-2 py-1 text-xs font:medium bg-orange-600 text-white hover:bg-orange-700">
                  {calculateDiscount(book.price, book.finalPrice)}% Off
                </span>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {bookImage.map((images, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={` relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border transition-all durtion-200 ${
                    selectedImage === index
                      ? "ring-2 ring-primary scale-105"
                      : "hover:scale-105"
                  }`}
                >
                  <Image
                    src={images}
                    alt={`${book.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
              images
            </div>
          </div>
          {/* book details */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">{book.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Posted : {formatDate(book.createdAt)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">share</Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddToWishList(book._id)}
                >
                  <Heart className="h-4 w-4 fill-red-500" />
                  <span className="hidden md:inline">Add</span>
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">💲{book.finalPrice}</span>
                {book.price && (
                  <span className="text-lg text-muted-foreground line-through">
                    💲{book.price}
                  </span>
                )}
                <Badge className="text-green 600">Shipping available</Badge>
              </div>
              <Button className="w-6- py-6 bg-blue-700">
                {isAddToCart ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Adding to Cart...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Buy Now
                  </>
                )}
              </Button>
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Book Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="font-medium text-muted-foreground">
                      Subject/Title
                    </div>
                    <div>{book.subject}</div>
                    <div className="font-medium text-muted-foreground">
                      Course
                    </div>
                    <div>{book.classType}</div>
                    <div className="font-medium text-muted-foreground">
                      Category
                    </div>
                    <div>{book.category}</div>
                    <div className="font-medium text-muted-foreground">
                      Author
                    </div>
                    <div>{book.author}</div>
                    <div className="font-medium text-muted-foreground">
                      Edition
                    </div>
                    <div>{book.edition}</div>
                    <div className="font-medium text-muted-foreground">
                      Condition
                    </div>
                    <div>{book.condition}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{book.description}</p>
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Our Community</h3>
                <p className="text-mutant-foreground">
                  We're not just another shopping website where you from
                  professional sellers - we are a vibrant community of students,
                  book lovers across India who deliver happiness to each other!
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div>Ad Id : {book._id}</div>
                <div>Posted : {formatDate(book.createdAt)}</div>
              </div>
            </CardContent>
          </Card>
          {/* book seller details */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Sold by</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-300 flex items-center justify-center">
                    <User2 className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{book.seller.name}</span>
                      <Badge className="text-green-600">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      Delhi, India
                    </div>
                  </div>
                </div>
              </div>
              {book.seller.phoneNumber && (
                <div className="flex items-cetner gap-3 text-sm">
                  <MessageCircle className="h-4 w-4 text blue-600" />
                  <span>Contact : {book.seller.phoneNumber}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* how it works section */}
        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold">How does it works ?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((item, index) => (
              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-none">
                <CardHeader>
                  <Badge className="w-fit mb-2">{item.step}</Badge>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={120}
                    height={120}
                    className="mx-auto"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

