import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginProp {
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

interface ForgotPasswordFormData {
  email: string;
}

export default function AuthPage({ isLoginOpen, setIsLoginOpen }: LoginProp) {
  const [currentTab, setCurrentTab] = useState<"login" | "signup" | "forgot">(
    "login"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginError },
  } = useForm<LoginFormData>();

  const {
    register: registerSignUp,
    handleSubmit: handleSignUp,
    formState: { errors: signUpError },
  } = useForm<SignUpFormData>();

  const {
    register: registerForgotPassword,
    handleSubmit: handleForgotPassword,
    formState: { errors: forgotPasswordError },
  } = useForm<ForgotPasswordFormData>();

  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold mb-4">
            Welcome to Book Kart
          </DialogTitle>
          <Tabs
            value={currentTab}
            onValueChange={(value) =>
              setCurrentTab(value as "login" | "signup" | "forgot")
            }
          >
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="forgot">Forgot</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="login" className="space-y-4">
                  <form className="space-y-4">
                    <div className="relative">
                      <Input
                        {...registerLogin("email", {
                          required: "Email is required",
                        })}
                        placeholder="Email"
                        type="email"
                        className="pl-10"
                      />
                      <Mail
                        className="absolute left-3 top-1/2 transform translate-y-1/2 text-gray-500"
                        size={20}
                      />
                    </div>
                  </form>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
