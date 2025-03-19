import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth,googleProvider } from "../../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import img from "../../assets/Luxury Decorative Floral Frame Ornamental Background Backgrounds _ PNG Free Download - Pikbest.jpeg";

// interface تعريف أنواع القيم المدخلة للفورم
interface LoginValues {
  email: string;
  password: string;
  rememberMe: boolean;
}
  // function تسجيل الدخول باستخدام Google
  const handleGoogleLogin = async () => {
    try {
      console.log("Google Login button clicked!"); // ✅ تأكيد أن الزر يتم النقر عليه
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google login successful:", result.user); // ✅ تأكيد نجاح تسجيل الدخول
      alert("Google login successful!");
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };
  

// password email إعداد التحقق من صحة البيانات باستخدام Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
    password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

//  دالة معالجة تسجيل الدخول
const handleSubmit = async (
  values: LoginValues,
  { setSubmitting, setErrors }: FormikHelpers<LoginValues>
) => {
  try {
    await signInWithEmailAndPassword(auth, values.email, values.password);
    alert("Login successful!");
  }catch (error: unknown) {
    if (error instanceof Error && 'code' in error) {
      if (error.code === "auth/user-not-found") {
        setErrors({ email: "No account found with this email" });
      } else if (error.code === "auth/wrong-password") {
        setErrors({ password: "Incorrect password" });
      } else {
        setErrors({ password: "Login failed. Please try again." });
      }
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
  setSubmitting(false);
};


const Login: React.FC = () => {
  return (
    <div className="flex justify-between items-center  ">
        <div className="flex justify-between flex-col items-center h-screen w-screen bg-cover bg-center  "
    style={{ backgroundImage: `url(${img})` }}>
        <h1 className="text-[80px] font-[900] mb-4">WELCOME BACK</h1>
        <p className=" mb-8 text-[15px] font-[500] text-black w-[250px] text-center">
            You Can Login Access With Your Existing Account
        </p>


        </div>

      
            
    <div className="flex justify-center w-1/2 items-center h-full">
    <div className=" bg-white/10  p-8 rounded-lg shadow-2xl w-96">
        <h2 className="text-2xl font-bold text-center mb-4 font-sans">LOGIN</h2>
        <Formik<LoginValues>
          initialValues={{ email: "", password: "", rememberMe: false }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/*  إدخال البريد الإلكتروني */}
              <div>
                <label className="block font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/*  إدخال كلمة المرور */}
              <div>
                <label className="block font-medium">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <Field type="checkbox" name="rememberMe" className="mr-2" />
                  Remember Me
                </label>
                <a href="#" className="text-orange-500 ">Forgot Password?</a>
              </div>

              {/*  زر تسجيل الدخول */}
              <button
                type="submit"
                className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 space-y-2">
          <button onClick={handleGoogleLogin} className="w-full flex gap-22 items-center  text-orange-600/80 cursor-pointer p-2 rounded border border-gray-300 hover:bg-gray-100">
          <FontAwesomeIcon className="ml-2 text-red-600 p-1 rounded-[50%] border   " icon={faGoogle} /> <h2 className="font-[900]">G O O G L E</h2>
          </button>
         
        </div>
        {/*  رابط التسجيل */}
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-orange-500">Sign Up</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
