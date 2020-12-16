import IEnumerator, { IndexerR2L } from "./IEnumerator";
import NodeT2BEnumerator from "./NodeT2BEnumerator";
import Stack from "./Stack";
import { TreeNode } from "./TreeNode";

export default class NodeEnumeratorFactory {
    public static create_df_12r_t2b_iter<T>(node: TreeNode<T> | undefined) {
        let iter:IEnumerator<TreeNode<T>> = new NodeT2BEnumerator(
            node, 
            IndexerR2L,
            Stack
        );
        return iter;
    }
}
