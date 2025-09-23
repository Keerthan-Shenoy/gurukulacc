import { AddaGallery } from "@/components/landing/AddaGallery";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export default function AddaPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            <Header />
            <main className="flex-1">
                <AddaGallery />
            </main>
            <Footer />
        </div>
    )
}
