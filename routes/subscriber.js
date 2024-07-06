const SubEmail = require("../models/email");
const express = require("express");
const router = express.Router();
const expressError = require("../Utils/expressError.js");
const { z } = require("zod");

// ZOD Schema for the subscriber valid email
const emailSchema = z.object({
    email: z.string().email({ message: "Your email is invalid" })
});

// subscribing emails are stored in the database
router.post("/", async (req, res) => {
    try {
        // Validate the request body using Zod
        const validatedData = emailSchema.parse(req.body);

        // Check if email already exists in the database
        const existingSubscriber = await SubEmail.findOne({ email: validatedData.email });
        if (existingSubscriber) {
            return res.status(400).json({ success: false, message: "Email is already subscribed" });
        }

        // Create a new subscriber
        const newSubscriber = new SubEmail({ email: validatedData.email });
        await newSubscriber.save();

    req.flash("success", "Your Email is subscribed Successfully");        
    res.redirect("/listings");
  
    } catch (err) {
        if (err instanceof z.ZodError) {
            // Zod validation error
            req.flash("error", "Invalid Email !");        
                res.redirect("/listings");
        } else {
            // Other errors (e.g., database errors)

                req.flash("error", "Subscription Failed !");        
                res.redirect("/listings");
        }
    }
});

module.exports = router;
