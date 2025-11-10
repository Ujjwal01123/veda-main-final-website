import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { 
  Upload, 
  FileText, 
  Download, 
  AlertCircle,
  CheckCircle,
  X
} from "lucide-react";

export function UploadData() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    const allowedTypes = ['text/csv', 'application/json', 'application/vnd.ms-excel'];
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV, JSON, or Excel file.",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    simulateUpload();
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload successful!",
            description: "Your puja data has been processed and added to the system.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  const downloadTemplate = () => {
    toast({
      title: "Template downloaded",
      description: "CSV template has been downloaded to help you format your data.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Upload Puja Data</h1>
        <p className="text-muted-foreground">
          Bulk upload puja information using CSV, JSON, or Excel files
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Upload className="w-5 h-5" />
              Upload File
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Drag and Drop Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-saffron bg-saffron/5' 
                  : 'border-border hover:border-saffron/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Drop your file here
              </h3>
              <p className="text-muted-foreground mb-4">
                Supports CSV, JSON, and Excel files
              </p>
              <Input
                type="file"
                accept=".csv,.json,.xlsx,.xls"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer">
                  Browse Files
                </Button>
              </Label>
            </div>

            {/* Upload Progress */}
            {uploadedFile && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-saffron" />
                    <div>
                      <p className="font-medium text-foreground">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {uploadProgress === 100 && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={removeFile}
                      className="w-8 h-8 hover:bg-red-100 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Uploading...</span>
                      <span className="text-foreground">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>
            )}

            {/* Template Download */}
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">
                  Need help formatting your data?
                </p>
                <p className="text-xs text-blue-700">
                  Download our CSV template to ensure proper formatting
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={downloadTemplate}
                className="border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                <Download className="w-4 h-4 mr-2" />
                Template
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Mapping */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Data Mapping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name-field" className="text-sm font-medium text-foreground">
                Puja Name Column
              </Label>
              <Input
                id="name-field"
                placeholder="e.g., puja_name, name, title"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="category-field" className="text-sm font-medium text-foreground">
                Category Column
              </Label>
              <Input
                id="category-field"
                placeholder="e.g., category, type, puja_type"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="price-field" className="text-sm font-medium text-foreground">
                Price Column
              </Label>
              <Input
                id="price-field"
                placeholder="e.g., price, cost, amount"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="description-field" className="text-sm font-medium text-foreground">
                Description Column
              </Label>
              <Input
                id="description-field"
                placeholder="e.g., description, details, info"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-foreground">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions or notes about this data upload..."
                className="mt-1"
                rows={3}
              />
            </div>

            <Button 
              variant="spiritual" 
              className="w-full"
              disabled={!uploadedFile || uploadProgress !== 100}
            >
              Process Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}