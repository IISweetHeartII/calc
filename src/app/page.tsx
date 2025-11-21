import { Calculator } from "@/components/calculator/Calculator";

export default function Home() {
  return (
    <div className="from-background to-muted/20 min-h-screen bg-gradient-to-b">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Calculator />
      </main>

      {/* Footer */}
      <footer className="text-muted-foreground mt-16 border-t py-8 text-center text-sm">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/IISweetHeartII/calc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground font-medium transition-colors"
          >
            DeokHwan
          </a>
        </p>
        <p className="mt-2">
          투자 손실에 대한 책임은 투자자 본인에게 있습니다. 이 도구는 참고용입니다.
        </p>
      </footer>
    </div>
  );
}
