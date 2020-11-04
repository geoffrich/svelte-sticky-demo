/**
 * Svelte action that executes a callback when a node becomes stuck or unstuck (position: sticky is having an effect)
 * @param node  - the node the action is placed on
 * @param params.callback - function to execute when the node becomes stuck or unstuck
 */
export default function sticky(node, params) {
    const { callback, stickToTop } = params;
    const intersectionCallback = function (entries) {
        const entry = entries[0];

        let isStuck = true;

        if (entry.isIntersecting) {
            isStuck = false;
        }

        callback(isStuck, entry);
    };

    const observer = new IntersectionObserver(intersectionCallback, {});

    // we insert and observe a sentinel node immediately after the target
    // when it is visible, the target node cannot be sticking
    const stickySentinelTop = document.createElement('div');
    stickySentinelTop.classList.add('stickySentinelTop');
    const stickySentinelBottom = document.createElement('div');
    stickySentinelBottom.classList.add('stickySentinelBottom');
    node.parentNode.prepend(stickySentinelTop);
    node.parentNode.append(stickySentinelBottom);

    if (stickToTop) {
        observer.observe(stickySentinelTop);
    } else {
        observer.observe(stickySentinelBottom);
    }

    return {
        // TODO: paragraphs are moved around when toggled
        update(params) {
            console.log(params.stickToTop);
            // unobserve and reobserve
        }
    };
}
