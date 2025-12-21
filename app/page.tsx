import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRight, Mic, Scale, FileText, 
  BookOpen, Gavel, Landmark, Twitter, Github, Linkedin, Mail 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    // Main Container
    <div className="flex flex-col min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-blue-500/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-48 pb-32 px-4 text-center space-y-10 max-w-6xl mx-auto">
        
        {/* BACKGROUND GLOW (Subtle & Static) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-8 animate-in fade-in duration-1000">
            
            {/* CONSTITUTION TEXT (Clean & Static) */}
            <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-gray-500">
              <span className="relative flex h-2.5 w-2.5">
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              Aligned with Article 39A
            </div>
            
            {/* HERO TITLE (No moving gradients) */}
            <h1 className="text-5xl md:text-8xl font-black tracking-wide text-white leading-[1.1]">
              Legal Clarity. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
                Instantly Available.
              </span>
            </h1>
            
            {/* SUBHEAD */}
            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed tracking-wide font-medium">
              Bharat Juris simplifies Indian Law. Chat with Nyaya Sahayak, draft rent agreements, and understand court notices in seconds.
            </p>
            
            {/* BUTTONS (No scaling/bouncing on hover) */}
            <div className="flex flex-col md:flex-row justify-center gap-4 pt-8 w-full sm:w-auto flex-wrap">
              {/* 1. Chat Button */}
              <Link href="/chat">
                  <Button size="lg" className="h-16 px-8 min-w-[240px] text-lg font-bold tracking-wide rounded-full bg-white text-black hover:bg-gray-200 transition-colors shadow-lg shadow-white/5 w-full sm:w-auto">
                  Start Consultation <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
              </Link>
              
              {/* 2. Analyzer Button */}
              <Link href="/documents">
                  <Button variant="outline" size="lg" className="h-16 px-8 min-w-[200px] text-lg font-bold tracking-wide rounded-full border border-[#333] bg-transparent text-white hover:bg-[#111] hover:border-blue-500/50 transition-colors w-full sm:w-auto">
                  Analyze Documents
                  </Button>
              </Link>

              {/* 3. Draft Documents Button */}
              <Link href="/draft">
                  <Button variant="outline" size="lg" className="h-16 px-8 min-w-[200px] text-lg font-bold tracking-wide rounded-full border border-[#333] bg-transparent text-white hover:bg-[#111] hover:border-blue-500/50 transition-colors w-full sm:w-auto">
                  Draft Documents
                  </Button>
              </Link>
            </div>
        </div>
      </section>

      {/* 2. TRUST SECTION */}
      <section id="constitution" className="w-full py-32 px-4 bg-[#0a0a0a] border-y border-[#1f1f1f] relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
          
          <div className="space-y-8 order-2 md:order-1">
            <h2 className="text-3xl md:text-5xl font-bold tracking-wide text-white leading-tight">
              Upholding the Spirit of <br/> Indian Law
            </h2>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed tracking-wide">
              We operate on the principles of the <strong>Constitution of India</strong>. 
              Our mission is to ensure that justice is not just a privilege for the wealthy, but a right accessible to every citizen.
            </p>
            
            <div className="space-y-6 pt-4">
                <div className="flex items-start gap-5 group">
                    <div className="p-3 rounded-2xl bg-[#151515] border border-[#333] group-hover:border-blue-500/50 transition-colors duration-300">
                        <Gavel className="h-6 w-6 text-white group-hover:text-blue-400 transition-colors duration-300" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors duration-300">Article 39A Compliance</h4>
                        <p className="text-gray-500 tracking-wide">Promoting equal justice and free legal aid.</p>
                    </div>
                </div>
                <div className="flex items-start gap-5 group">
                    <div className="p-3 rounded-2xl bg-[#151515] border border-[#333] group-hover:border-blue-500/50 transition-colors duration-300">
                        <Landmark className="h-6 w-6 text-white group-hover:text-blue-400 transition-colors duration-300" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors duration-300">BNS & IPC Trained</h4>
                        <p className="text-gray-500 tracking-wide">Up-to-date with Bharatiya Nyaya Sanhita.</p>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="order-1 md:order-2 relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl border border-[#333]">
              <Image 
                src="/court.jpg" 
                alt="Supreme Court of India" 
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm font-bold tracking-[0.2em] uppercase mb-2 text-blue-400">Justice For All</p>
                <p className="text-lg opacity-90 font-medium tracking-wide">Bridging the gap between the judiciary and the people.</p>
              </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION - UPDATED WITH GREY ICONS */}
      <section id="features" className="w-full py-32 px-4 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-wide text-white">Powerful Tools, Simple Use</h2>
            <p className="text-xl text-gray-400 tracking-wide">Everything you need to navigate the legal system with confidence.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Mic,
                title: "Speak Your Language",
                desc: "Legal advice in Hindi, Marathi, or English. Our AI understands your local dialect."
              },
              {
                icon: FileText,
                title: "Simplify Court Notices",
                desc: "Received a confusing notice? Upload it and get a summary: Is it urgent? What should you do next?"
              },
              {
                icon: BookOpen,
                title: "Instant Drafting",
                desc: "Create legally binding Rent Agreements and Affidavits in minutes, without a lawyer."
              }
            ].map((feature, i) => (
              <Card key={i} className="group bg-[#0a0a0a] border-[#333] hover:border-gray-700 hover:bg-[#0f0f0f] transition-all duration-300">
                <CardHeader>
                  {/* UPDATED: Icons are now GREY (text-gray-500) and turn WHITE on hover */}
                  <feature.icon className="h-12 w-12 text-gray-500 mb-6 group-hover:text-white transition-colors duration-300" />
                  <CardTitle className="text-2xl font-bold tracking-wide text-white group-hover:text-blue-400 transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-lg text-gray-400 leading-relaxed tracking-wide group-hover:text-gray-300 transition-colors duration-300">
                  {feature.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESS SECTION */}
      <section id="how-it-works" className="w-full py-32 px-4 border-t border-[#1f1f1f] bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-bold tracking-wide text-white">Get Answers in 3 Steps</h2>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-[2.5rem] left-[16%] right-[16%] h-0.5 bg-[#1f1f1f] z-0"></div>

            {[
                { title: "Ask Your Query", desc: "Type or speak naturally. No legal jargon required." },
                { title: "AI Analysis", desc: "Our system cross-references thousands of Indian laws instantly." },
                { title: "Get Solution", desc: "Receive clear, actionable advice or a drafted document." }
            ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-6 group cursor-default">
                    <div className="h-20 w-20 rounded-full bg-[#151515] border-4 border-[#333] group-hover:border-blue-500 group-hover:text-blue-500 flex items-center justify-center shadow-xl z-10 transition-colors duration-300">
                        <span className="text-3xl font-bold text-white group-hover:text-blue-500 transition-colors duration-300">{i + 1}</span>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-2xl font-bold tracking-wide text-white group-hover:text-blue-400 transition-colors duration-300">{step.title}</h3>
                        <p className="text-gray-400 max-w-xs text-base leading-relaxed tracking-wide mx-auto">{step.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="w-full py-12 px-6 border-t border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-0">
            
            {/* Left: Brand & Info */}
            <div className="space-y-4 max-w-sm">
                <div className="flex items-center gap-3 font-bold text-2xl tracking-tight text-white">
                    {/* Large Footer Logo (Text Removed) */}
                    <div className="relative h-24 w-24"> 
                        <Image 
                          src="/logo.png" 
                          alt="Bharat Juris Logo"
                          fill
                          className="object-contain"
                        />
                    </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Democratizing legal access through AI. <br/> 
                    Breaking language barriers and simplifying complexity.
                </p>
                <div className="pt-4 flex items-center gap-2 text-xs text-gray-500">
                    <span>© 2024 Bharat Juris.</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600"/>
                    <span>Made with ❤️ in India.</span>
                </div>
            </div>

            {/* Right: Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 text-sm">
                
                {/* Column 1 */}
                <div className="space-y-4">
                    <h4 className="text-white font-semibold tracking-wide">Platform</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link href="/chat" className="hover:text-blue-400 transition-colors">Nyaya Sahayak</Link></li>
                        <li><Link href="/documents" className="hover:text-blue-400 transition-colors">Analyzer</Link></li>
                        <li><Link href="/draft" className="hover:text-blue-400 transition-colors">Legal Drafter</Link></li>
                    </ul>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                    <h4 className="text-white font-semibold tracking-wide">Legal</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link href="/legal" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/legal" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                        <li><Link href="/legal" className="hover:text-blue-400 transition-colors">Disclaimer</Link></li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div className="space-y-4">
                    <h4 className="text-white font-semibold tracking-wide">Connect</h4>
                    <div className="flex gap-4">
                        <Link href="https://x.com/PlayzMac" target="_blank" className="p-2 bg-[#151515] rounded-full text-gray-400 hover:text-white hover:bg-blue-600 transition-all border border-[#222]">
                            <Twitter className="h-4 w-4" />
                        </Link>
                        <Link href="https://github.com/Macplayz" target="_blank" className="p-2 bg-[#151515] rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-all border border-[#222]">
                            <Github className="h-4 w-4" />
                        </Link>
                        <Link href="mailto:machhanilay@gmail.com" className="p-2 bg-[#151515] rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-all border border-[#222]">
                            <Mail className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </footer>

    </div>
  );
}