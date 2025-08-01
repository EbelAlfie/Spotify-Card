import { getErrorCard } from "../../card/ErrorCard.js";
import { timeOffset } from "../../domain/model/Device.js";

export const createStateRef = (stateMachine, stateRef) => {
    if (!stateRef)
        return null;
    const state = stateMachine.states[stateRef.state_index];
    if (!state)
        throw new Error("TP_CANNOT_CREATE_STATE_REF","Invalid state reference.");
    return {
        state_machine_id: stateMachine.state_machine_id,
        state_id: state.state_id,
        paused: stateMachine.paused
    }
}

export function parseTrack(stateRef, stateMachine) {
    const stateIndex = stateRef.state_index

    const state = stateMachine.states[stateIndex] 
    const track = stateMachine.tracks[state.track]

    const manifestProps = ["file_ids_mp4", "file_ids_mp4_dual"]
    const trackManifestList = track.manifest
    const trackUri = track.metadata.uri

    const trackManifest = trackManifestList[manifestProps[0]] //Temporary get 0

    const manifest = Array.isArray(trackManifest) && trackManifest.length && trackManifest[0]
    
    return {
        fileId: manifest?.file_id ?? "",
    }
}

export function calculateSegment(manifest) {
    let {
        seektableVersion = 0,
        offset = 0,
        timescale = 0,
        segments = [],
        encoderDelaySample = "",
        paddingSample = "",
        pssh = "",
        indexRange = []
    } = manifest

    const initSegment = {
        index: -1,
        timeEnd: 0,
        timeStart: 0,
        byteRanges: {
            audio: {
                start: 0,
                end: manifest.offset - 1
            }
        }
    }

    const segmentLength = segments.length
    let contentSegments = new Array(segmentLength)

    let start = 0

    for (let i = 0; i < segmentLength; i++) {
        const segment = segments[i]
        if (!(null == segment ? void 0 : segment.length))
            continue;

        const [first, second] = segment
        const end = second/ timescale

        const contentSegment = {
            index: i,
            timeStart: start,
            timeEnd: start + end,
            byteRanges: {
                audio: {
                    start: offset,
                    end: offset + (first - 1)
                }
            }
        }

        contentSegments[i] = contentSegment
        start += end
        offset += first
        // Math.floor(end) > segmentLength && (segmentLength = Math.floor(end))
    }

    return {
        initSegment: initSegment,
        contentSegments: contentSegments
    }
}

export function getSegmentForRange(contentSegments, timeStart = 0, timeEnd = 12) {
    var n;
    const rangedSegments = [];
    if (null === (n = contentSegments) || void 0 === n ? void 0 : n.length)
        for (const segment of contentSegments)
            segment.timeStart <= timeEnd && segment.timeEnd >= timeStart && rangedSegments.push(segment);
    return rangedSegments
}

export function filterBufferedSegment(rangedSegments) {
    const e = this._getBufferedTimeRanges();
    let filteredSegments = [];
    if (null == e ? void 0 : e.length)
        t: for (const o of t) {
            let t = e.length;
            for (; t--; ) {
                const n = e.start(t)
                    , a = e.end(t);
                if (n <= o.timeStart && (a >= o.timeEnd || a + 1e-5 > o.timeEnd))
                    continue t
            }
            filteredSegments.push(o)
        }
    else
        filteredSegments = rangedSegments;
    return filteredSegments
}

/** True if it is error */
export function isError(error, response, debug) {
    if (error instanceof Error) {
        response.status(500)
        const errorMessage = error.message
        response.send(debug ? errorMessage : getErrorCard(errorMessage))
        return true
    }
    return false
}

export function appendBuffer(initBuffer, buffer, initLength, bufferLength) {
    const newBuffer = new Uint8Array(initBuffer.byteLength + buffer.byteLength)
    newBuffer.set(new Uint8Array(initBuffer), initLength)
    newBuffer.set(new Uint8Array(buffer), bufferLength)
    return newBuffer
}

export const readBodyAsBuffer = (req) => {
    return new Promise((resolve, reject) => {
      let body = []
      req.on('data', chunk => {
        body.push(chunk)
      })
      req.on('end', () => {
        resolve(Buffer.concat(body))
      })
      req.on('error', err => {
        reject(err)
      })
    })
  }