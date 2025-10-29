import mongoose from "mongoose";

interface PromoCode {
  code: string;
  usedBy: mongoose.Schema.Types.ObjectId;
}

const promoCodeSchema = new mongoose.Schema<PromoCode>({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  usedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const PromoCode =
  mongoose.models.PromoCode || mongoose.model("PromoCode", promoCodeSchema);

export default PromoCode;
