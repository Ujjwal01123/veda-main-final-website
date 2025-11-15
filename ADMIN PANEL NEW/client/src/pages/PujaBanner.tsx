"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/updatedSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sun,
  Upload,
  ArrowLeft,
  Sparkles,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import axios from "axios";

export function PujaBanner() {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [altTexts, setAltTexts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // ✅ Allow up to 6 images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (files.length === 0) {
      alert("⚠️ Please select between 1 and 6 images!");
      return;
    }
    if (files.length > 6) {
      alert("⚠️ You can upload a maximum of 6 images!");
      e.target.value = "";
      return;
    }

    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
    setAltTexts(new Array(files.length).fill(""));
  };

  const handleAltTextChange = (index: number, value: string) => {
    const updatedAltTexts = [...altTexts];
    updatedAltTexts[index] = value;
    setAltTexts(updatedAltTexts);
  };

  const handleUpload = async () => {
    if (images.length === 0) return alert("⚠️ Please select at least 1 image!");
    if (images.length > 6)
      return alert("⚠️ You can upload a maximum of 6 images!");
    if (altTexts.some((txt) => !txt.trim()))
      return alert("⚠️ Please provide alt text for all images!");

    try {
      setLoading(true);
      const formData = new FormData();
      images.forEach((img) => formData.append("images", img));
      altTexts.forEach((txt) => formData.append("altText", txt));
      formData.append("sectionName", "puja");

      const res = await axios.post(`${apiUrl}/api/banners`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("✅ Puja banners uploaded successfully!");
        setImages([]);
        setPreviews([]);
        setAltTexts([]);
        navigate("/banners/view/puja");
      } else {
        alert("❌ Failed to upload banners. Please try again.");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-spiritual-light/10 via-background to-accent/5">
      {/* Sidebar */}
      <div className="hidden lg:block w-64 border-r border-border/40 bg-white/80 backdrop-blur-md">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-muted-foreground"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Button>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-spiritual flex items-center justify-center shadow-spiritual">
                <Sun className="w-6 h-6 text-spiritual-foreground" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                Puja Banner Settings
              </h1>
            </div>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Upload up to <strong>6 banners</strong> for the Puja section, each
              with unique alt text and preview.
            </p>
          </div>

          {/* Upload Section */}
          <Card className="bg-gradient-card border-border/50 shadow-card p-6">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold">
                Upload Puja Banners (Up to 6 Images)
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {/* Preview Area */}
              {previews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {previews.map((src, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-3 border rounded-xl p-3 shadow-sm"
                    >
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="rounded-lg shadow-md border w-full h-40 object-cover"
                      />
                      <Input
                        type="text"
                        placeholder={`Alt text ${index + 1}`}
                        value={altTexts[index]}
                        onChange={(e) =>
                          handleAltTextChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="w-10 h-10 mb-3 opacity-70" />
                  <p>No images selected yet</p>
                </div>
              )}

              {/* Choose Images */}
              <div className="flex flex-col mt-4">
                <Label>Select Up to 6 Banner Images</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You can select <strong>1 to 6 images</strong>. Recommended
                  size: <strong>1920x600 px</strong>
                </p>
              </div>

              {/* Upload Button */}
              <div className="mt-8 flex justify-center">
                <Button
                  variant="spiritual"
                  onClick={handleUpload}
                  disabled={loading}
                  className="w-full sm:w-1/2 py-5 text-lg font-medium shadow-spiritual flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" /> Upload Banners
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center py-6 text-muted-foreground flex justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>
              Ensure your Puja banners reflect divine energy & spiritual
              harmony.
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
