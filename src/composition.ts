import { DrizzleBookRepository } from "./infrastructure/api/db/book";
import { DrizzleRecommendationRepository } from "./infrastructure/api/db/recommendation";

import { AddNewAuthorUseCase } from "./core/use-cases/AddNewAuthor";
import { AddNewBooksUseCase } from "./core/use-cases/AddNewBook";
import { CreateCategoryUseCase } from "./core/use-cases/CreateCategory";
import { DeleteCategoryUseCase } from "./core/use-cases/DeleteCategory";
import { EditAuthorUseCase } from "./core/use-cases/EditAuthor";
import { EditBookUseCase } from "./core/use-cases/EditBook";
import { EditCategoryUseCase } from "./core/use-cases/EditCategory";
import { GetTopAuthors } from "./core/use-cases/GetTopAuthors";
import { GetTopBooks } from "./core/use-cases/GetTopBooks";
import { SignInUseCase } from "./core/use-cases/SignIn";
import { UploadAuthorImageUseCase } from "./core/use-cases/UploadAuthorImage";
import { UploadBookCoverUseCase } from "./core/use-cases/UploadBookCover";
import { UploadNewImageUseCase } from "./core/use-cases/UploadNewImage";
import { BetterAuthRepository } from "./infrastructure/api/better-auth/auth";
import { BetterAuthSessionAdapter } from "./infrastructure/api/better-auth/session";
import { DrizzleCategoryRepository } from "./infrastructure/api/db/category";
import {
  DrizzleAuthorRepository,
  DrizzleUserRepository,
} from "./infrastructure/api/db/user";
import { ImageKitImageUploadService } from "./infrastructure/image-upload/imagekit-io";
import { GetAllBooksUseCase } from "./core/use-cases/GetAllBooks";
import { SearchAuthorByNameUseCase } from "./core/use-cases/SearchAuthorsByName";
import { GetAllRecommendationsUseCase } from "./core/use-cases/GetAllRecommendations";
import { AddRecommendationUseCase } from "./core/use-cases/AddRecommendation";
import { AddNewUserUseCase } from "./core/use-cases/AddNewUser";
import { SearchUsersByNameUseCase } from "./core/use-cases/SearchUsersByName";
import { GetTopInfluencersUseCase } from "./core/use-cases/GetTopInfluencers";
import type {
  AuthorUser,
  InfluencerUser,
  User,
} from "./core/domain/entities/user";
import { GetAllInfluencersUseCase } from "./core/use-cases/GetAllInfluencers";
import { DrizzleInfluencerRepository } from "./infrastructure/api/db/influencer";
import { UploadUserImageUseCase } from "./core/use-cases/UploadUserImage";

// Initialize repositories
export const bookRepository = new DrizzleBookRepository();
export const userRepository = new DrizzleUserRepository<User>();
export const recommendationRepository = new DrizzleRecommendationRepository();
export const authRepository = new BetterAuthRepository();
export const categoryRepository = new DrizzleCategoryRepository();
export const authorRepository = new DrizzleAuthorRepository<AuthorUser>();
export const influencerRepository = new DrizzleInfluencerRepository();

// initialize adapters
export const sessionAdapter = new BetterAuthSessionAdapter(userRepository);

// initialize third-party services
export const imageUploadService = new ImageKitImageUploadService();

// Initialize use cases
export const uploadNewImageUseCase = new UploadNewImageUseCase(
  imageUploadService,
);
export const getAllBooksUseCase = new GetAllBooksUseCase(bookRepository);
export const getTopBooksUseCase = new GetTopBooks(bookRepository);
export const addNewBookUseCase = new AddNewBooksUseCase(
  bookRepository,
  sessionAdapter,
  uploadNewImageUseCase,
);
export const addNewAuthorUseCase = new AddNewAuthorUseCase(
  authorRepository,
  sessionAdapter,
);
export const addNewUserUseCase = new AddNewUserUseCase(
  userRepository,
  sessionAdapter,
);
export const uploadUserImageUseCase = new UploadUserImageUseCase(
  userRepository,
  imageUploadService,
);
export const createCategoryUseCase = new CreateCategoryUseCase(
  categoryRepository,
  sessionAdapter,
);
export const editCategoryUseCase = new EditCategoryUseCase(
  categoryRepository,
  sessionAdapter,
);
export const editAuthorUseCase = new EditAuthorUseCase(
  authorRepository,
  sessionAdapter,
);
export const editBookUseCase = new EditBookUseCase(
  bookRepository,
  sessionAdapter,
);
export const deleteCategoryUseCase = new DeleteCategoryUseCase(
  categoryRepository,
  sessionAdapter,
);
export const searchAuthorsByNameUseCase = new SearchAuthorByNameUseCase(
  authorRepository,
);
export const searchUsersByNameUseCase = new SearchUsersByNameUseCase(
  userRepository,
);
export const getTopAuthorsUseCase = new GetTopAuthors(authorRepository);
export const signInUseCase = new SignInUseCase(authRepository);
export const uploadBookCoverUseCase = new UploadBookCoverUseCase(
  bookRepository,
  imageUploadService,
);
export const uploadAuthorImageUseCase = new UploadAuthorImageUseCase(
  authorRepository,
  imageUploadService,
);
export const getAllRecommendationsUseCase = new GetAllRecommendationsUseCase(
  recommendationRepository,
);
export const addRecommendationUseCase = new AddRecommendationUseCase(
  recommendationRepository,
);
export const getAllInfluencersUseCase = new GetAllInfluencersUseCase(
  influencerRepository,
);
