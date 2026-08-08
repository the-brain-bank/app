import { DrizzleBookRepository } from "./infrastructure/api/db/book";
import { DrizzleRecommendationRepository } from "./infrastructure/api/db/recommendation";

import { AddNewAuthorUseCase } from "./core/use-cases/AddNewAuthor";
import { AddNewBooksUseCase } from "./core/use-cases/AddNewBook";
import { CreateCategoryUseCase } from "./core/use-cases/CreateCategory";
import { DeleteCategoryUseCase } from "./core/use-cases/DeleteCategory";
import { EditAuthorUseCase } from "./core/use-cases/EditAuthor";
import { EditBookUseCase } from "./core/use-cases/EditBook";
import { EditCategoryUseCase } from "./core/use-cases/EditCategory";
import { GetPersonProfile } from "./core/use-cases/GetPersonProfile";
import { GetTopAuthors } from "./core/use-cases/GetTopAuthors";
import { GetTopBooks } from "./core/use-cases/GetTopBooks";
import { SignInUseCase } from "./core/use-cases/SignIn";
import { UploadAuthorImageUseCase } from "./core/use-cases/UploadAuthorImage";
import { UploadBookCoverUseCase } from "./core/use-cases/UploadBookCover";
import { UploadNewImageUseCase } from "./core/use-cases/UploadNewImage";
import { BetterAuthRepository } from "./infrastructure/api/better-auth/auth";
import { BetterAuthSessionAdapter } from "./infrastructure/api/better-auth/session";
import { DrizzleCategoryRepository } from "./infrastructure/api/db/category";
import { DrizzleUserRepository } from "./infrastructure/api/db/user";
import { ImageKitImageUploadService } from "./infrastructure/image-upload/imagekit-io";
import { GetAllBooksUseCase } from "./core/use-cases/GetAllBooks";
import { SearchAuthorByNameUseCase } from "./core/use-cases/SearchAuthorsByName";

// Initialize repositories
export const bookRepository = new DrizzleBookRepository();
export const userRepository = new DrizzleUserRepository();
export const recommendationRepository = new DrizzleRecommendationRepository();
export const authRepository = new BetterAuthRepository();
export const categoryRepository = new DrizzleCategoryRepository();

// initialize adapters
export const sessionAdapter = new BetterAuthSessionAdapter(userRepository);

// initialize third-party services
export const imageUploadService = new ImageKitImageUploadService();

// Initialize use cases
export const uploadNewImageUseCase = new UploadNewImageUseCase(imageUploadService);
export const getAllBooksUseCase = new GetAllBooksUseCase(bookRepository);
export const getTopBooksUseCase = new GetTopBooks(bookRepository);
export const addNewBookUseCase = new AddNewBooksUseCase(
  bookRepository,
  sessionAdapter,
  uploadNewImageUseCase,
);
export const addNewAuthorUseCase = new AddNewAuthorUseCase(
  userRepository,
  sessionAdapter,
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
  userRepository,
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
export const searchAuthorsByNameUseCase = new SearchAuthorByNameUseCase(userRepository);
export const getPersonProfileUseCase = new GetPersonProfile(
  userRepository,
  bookRepository,
  recommendationRepository,
);
export const getTopAuthorsUseCase = new GetTopAuthors(userRepository);
export const signInUseCase = new SignInUseCase(authRepository);
export const uploadBookCoverUseCase = new UploadBookCoverUseCase(
  bookRepository,
  imageUploadService,
);
export const uploadAuthorImageUseCase = new UploadAuthorImageUseCase(
  userRepository,
  imageUploadService,
);
