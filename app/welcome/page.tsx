import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Logo from '@/public/Code-of-Arms-colour.png';
import MainIcon from '@/public/main-icon.png';
import { Email } from "@/components/Custom/email-login";
import { OneGovID } from "@/components/Custom/one-gov";

export default function Welcome() {
  return (
    <main className="bg-sky-400 w-full min-h-screen flex flex-col">
      <div className="flex md:justify-start justify-center md:py-10 py-0">
        <div className="md:rounded-r-lg rounded-b-lg bg-white p-5 md:w-72 w-48">
          <Image
            src={Logo}
            width={350}
            height={350}
            priority
            alt="Coat of arms"
          />
        </div>
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div className="flex justify-center md:justify-start">
          <div className="grid grid-cols-1 md:m-10">
            <h1 className="text-4xl font-bold text-center md:text-left">Welcome to</h1>
            <div className="flex justify-center md:hidden">
              <Image
                src={MainIcon}
                width={176}
                height={176}
                priority
                alt="Main icon"
                className="w-44 h-auto"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start my-2">
              <div className="flex flex-col md:flex-row md:text-white text-black text-5xl text-center md:text-left">
                <h2 className="font-bold">Confiscated Asset</h2>
                <h2 className="font-light md:ml-2">Management Service</h2>
              </div>
              <h2 className="font-bold text-5xl md:text-white text-black md:ml-2">e-Services Portal</h2> 
            </div>
          </div>
        </div>
        <div className="flex md:justify-end justify-center mb-5">
          <div className="flex space-x-1 md:space-x-10 md:pr-10">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="px-10 py-4">Login</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                  <DialogDescription>
                    Complete the form below to access your account.
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="onegov" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="onegov">1Gov ID</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                  </TabsList>
                  <TabsContent value="onegov">
                    <OneGovID />
                  </TabsContent>
                  <TabsContent value="email">
                    <Email />
                  </TabsContent>
                </Tabs> 
                <DialogFooter>
                  {/* Add a submit button or other footer content if needed */}
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Register</Button>
              </DialogTrigger>
              {/* Add DialogContent for registration form */}
            </Dialog>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:hidden items-center mt-auto">
        <Button className="bg-sky-300 hover:bg-sky-400 rounded-full px-10 py-1.5 mb-2">
          Get In Touch
        </Button>
        <p className="text-sm">© 2024 Asset Management Portal v1.0.0</p>
      </div>
    </main>
  );
}