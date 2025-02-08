import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    channelid: {
      type: String,
      required: [true, "Channel ID is required"],
      trim: true,
    },
    videoid: {
      type: String,
      required: [
        true,
        "Error No video Id is assigned to the video.Please try again",
      ],
      trim: true,
      unique: true, // If videoid should be unique
      index: true, // For faster queries
    },
    url: {
      type: String,
      required: [true, "No cloud link was generated for video"],
      validate: {
        validator: function (v: string) {
          // Basic URL validation
          return /^https?:\/\/.+/.test(v);
        },
        message: "Invalid cloud link URL",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

export const Video =
  mongoose.models.Video || mongoose.model("Video", VideoSchema);
