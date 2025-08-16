"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { books, filters } from "@/lib/constant";
import Link from "next/link";
import React, { useState } from "react";

export default function Books() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("newest");
  const bookPerPage = 6;

  const toggleFilter = (section: string, item: string) => {
    const updateFilter = (prev: string[]) => {
      return prev.includes(item)
        ? prev.filter((i) => item != i)
        : [...prev, item];
    };

    switch (section) {
      case "condition":
        setSelectedCondition(updateFilter);
        break;
      case "classType":
        setSelectedType(updateFilter);
        break;
      case "category":
        setSelectedCategory(updateFilter);
        break;
    }
    setCurrentPage(1);
  };
  const filterBooks = books.filter((book) => {
    const conditionMatch =
      selectedCondition.length === 0 ||
      selectedCondition
        .map((cond) => cond.toLowerCase())
        .includes(book.condition.toLowerCase());

    const typeMatch =
      selectedType.length === 0 ||
      selectedType
        .map((type) => type.toLowerCase())
        .includes(book.classType.toLowerCase());

    const categoryMatch =
      selectedCategory.length === 0 ||
      selectedCategory
        .map((cat) => cat.toLowerCase())
        .includes(book.category.toLowerCase());

    return conditionMatch && typeMatch && categoryMatch;
  });

  const sortedBooks = [...filterBooks].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "price-low":
        return a.finalPrice - b.finalPrice;
      case "price-high":
        return b.finalPrice - a.finalPrice;

      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">
            {" "}
            Home{" "}
          </Link>
          <span>/</span>
          <span>Books</span>
        </nav>
        <h1 className="mb-8 text-3xl font-bold">
          {" "}
          Find from over 1000s of used books online{" "}
        </h1>
        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          <div className="space-y-6">
            <Accordion
              type="multiple"
              className="bg-white p-6 border rounded-lg"
            >
              {Object.entries(filters).map(([key, values]) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-2 space-y-2">
                      {values.map((value) => (
                        <div
                          key={value}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={value}
                            checked={
                              key === "condition"
                                ? selectedCondition.includes(value)
                                : key == "classType"
                                ? selectedType.includes(value)
                                : selectedCategory.includes(value)
                            }
                            onCheckedChange={() => toggleFilter(key, value)}
                          />
                          <label
                            htmlFor={value}
                            className="text-sm font-medium leading-none"
                              >
                                  {value}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            class
          </div>
        </div>
      </div>
    </div>
  );
}
