import { RuleTester } from "eslint";
import rule, {
  PUBLIC_ERROR,
  TESTING_PUBLIC_ERROR,
} from "../../../lib/rules/public-api-import.js";
import { aliasOptions, testFilesOptions } from "../../../helpers/index.js";

/**
 * @fileoverview External modules should be imported via public api
 * @author Abuzar
 */

const ruleTester = new RuleTester();

ruleTester.run("public-api-import", rule, {
  valid: [
    {
      code: 'import { module } from "../../lib/module"',
    },
    {
      code: 'import { article } from "~/entities/article"',
      options: aliasOptions,
    },
    {
      filename:
        "/Users/vendor_a.mamedova/dev/production-react/src/__tests__/features/addCommentForm.test.tsx",
      code: "import { addCommentForm } from '~/features/addCommentForm/testing'",
      options: testFilesOptions,
    },
    {
      filename:
        "/Users/vendor_a.mamedova/dev/production-react/src/__stories__/features/addCommentForm.stories.tsx",
      code: 'import { AddCommentForm } from "~/features/addComment/testing"',
      options: testFilesOptions,
    },
  ],

  invalid: [
    {
      code: 'import { module } from "~/entities/article/lib/module"',
      errors: [{ messageId: PUBLIC_ERROR }],
      options: aliasOptions,
      output: 'import { module } from "~/entities/article"',
    },
    {
      filename:
        "/Users/vendor_a.mamedova/dev/production-react/src/features/addCommentForm.tsx",
      code: 'import { Comment } from "~/entities/comment/testing"',
      options: testFilesOptions,
      errors: [{ messageId: TESTING_PUBLIC_ERROR }],
    },
  ],
});
