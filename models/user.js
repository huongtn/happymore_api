const validator = require('validator');
module.exports = (mongoose) => {
  const refreshToken = new mongoose.Schema({
    token: {
      type: String,
      trim: true,
    },
    expiration: {
      type: Date,
    },
    issued: {
      type: Date,
      default: Date.now(),
    },
    select: false,
  });

  const addressSchema = new mongoose.Schema({
    address: {
      type: String
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  });
  const bankAcountSchema = new mongoose.Schema({
    bankName: {
      type: String
    },
    accountNumber: {
      type: String
    },
    accountName: {
      type: String
    },
    branch: {
      type: String
    }
  });
  const userSchema = new mongoose.Schema(
    {
      fullName: {
        type: String
      },
      agentCode: {
        type: String
      },
      parentAgentCode: {
        type: String
      },
      email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'email cannot be empty'],
        lowercase: true,
        validate: [validator.isEmail],
      },
      phoneNumber: {
        type: String
      },
      password: {
        type: String
      },
      code: {
        type: String
      },
      codeExpires: {
        type: Date,
        select: false,
      },
      photo: {
        type: String,
      },
      icNumber: {
        type: String
      },
      icPhotos: {
        type: [String]
      },
      role: {
        type: String,
        enum: ['Admin', 'Manager', 'User', 'Agent'],
        default: 'Agent',
      },
      authLoginToken: {
        type: String,
        select: false,
      },
      authLoginExpires: {
        type: Date,
        select: false,
      },
      gender: {
        type: Number
      },
      country: {
        type: String
      },
      dob: {
        type: Date
      },
      active: {
        type: Boolean,
        //default: false
      },
      refreshTokens: [refreshToken],
      address: [addressSchema],
      bankAccount: bankAcountSchema,
      // Tổng doanh số
      totalSales: {
        type: Number
      },
      totalIncome: {
        type: Number
      },
      unpaidIncome: {
        type: Number
      },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
  );

  // userSchema.pre(/^find/, function (next) {
  //   // This points to the current query
  //   this.find({ active: { $ne: false } });
  //   next();
  // });

  userSchema.methods.createAuthToken = function () {
    const authToken = crypto.randomBytes(3).toString('hex');

    this.authLoginToken = crypto
      .createHash('sha256')
      .update(authToken)
      .digest('hex');

    this.authLoginExpires = Date.now() + 10 * 60 * 1000;

    return authToken;
  };
  return userSchema;
} 
