namespace Demo

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.JQuery
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.Html5
open IntelliFactory.WebSharper.EcmaScript
open IntelliFactory.WebSharper.Formlet

module Demo =

    [<JavaScript>]
    let mutable width = 0.
    [<JavaScript>]
    let mutable height = 0.

    [<Literal>]
    let minSpeed = 0.025
    [<Literal>]
    let maxSpeed = 0.05
    [<Literal>]
    let minRadius = 0.0025
    [<Literal>]
    let maxRadius = 0.01
    [<JavaScript>]
    let mutable numParticles = 2000

    [<JavaScript>]
    let mutable gx = 0.
    [<JavaScript>]
    let mutable gy = 0.

    [<Inline "$1.push($0)">]
    let push (x : 'a) (arr : 'a[]) = ()
    [<Inline "$0.shift()">]
    let shift (x : 'a[]) = ()

    type Triangle =
        {
            mutable cx : float
            mutable cy : float
            mutable d1 : float
            mutable a1 : float
            mutable d2 : float
            mutable a2 : float
            mutable d3 : float
            mutable a3 : float
            mutable vx : float
            mutable vy : float
            mutable va : float
            baseColor : string
            mutable color : string
        }
    with
        [<JavaScript>]
        member t.Reinit () =
            t.cy <- 0.
            t.cx <- width * Math.Random ()
            t.vx <- 0.
            t.vy <- height * (minSpeed + (maxSpeed - minSpeed) * Math.Random ())
            t.va <- 0.4 * Math.Random () - 0.2
            t.color <- t.baseColor

        [<JavaScript>]
        member t.Update (canvas : CanvasRenderingContext2D) =
            if t.cy > height then
                t.Reinit ()
            else
                t.vx <- t.vx + gx
                t.vy <- t.vy + gy
                t.cx <- t.cx + t.vx
                t.cy <- t.cy + t.vy
            t.a1 <- t.a1 + t.va
            t.a2 <- t.a2 + t.va
            t.a3 <- t.a3 + t.va

        [<JavaScript>]
        member t.Draw (ctx : CanvasRenderingContext2D) =
            if t.cy >= 0. then
                ctx.FillStyle <- t.color
                ctx.BeginPath ()
                let x1 = t.d1 * Math.Cos t.a1
                let y1 = t.d1 * Math.Sin t.a1
                ctx.MoveTo (t.cx + x1, t.cy + y1)
                let x2 = t.d2 * Math.Cos t.a2
                let y2 = t.d2 * Math.Sin t.a2
                ctx.LineTo (t.cx + x2, t.cy + y2)
                let x3 = t.d3 * Math.Cos t.a3
                let y3 = t.d3 * Math.Sin t.a3
                ctx.LineTo (t.cx + x3, t.cy + y3)
                ctx.Fill ()

        [<JavaScript>]
        member t.IntersectObstacle (obstacle) =
            let r = Obstacle.r * 2.
            if Math.Abs (t.cx - obstacle.x) + Math.Abs (t.cy - obstacle.y) < r then
                let sign = if t.cx > obstacle.x then 1. else -1.
                t.cx <- t.cx + sign * 20.
                t.va <- sign * 0.5
                t.color <- obstacle.color
                t.vx <- t.vx + sign * 3. * Math.Random ()

    and Obstacle =
        {
            mutable x : float
            mutable y : float
            mutable color : string
            mutable speed : float
            mutable targetX : float
            mutable targetY : float
            draw : Obstacle * CanvasRenderingContext2D -> unit
            update : Obstacle * CanvasRenderingContext2D -> unit
        }
    with
        [<JavaScript>]
        static member r = 100.

        [<JavaScript>]
        member s.Update (ctx : CanvasRenderingContext2D) =
            s.update (s, ctx)

        [<JavaScript>]
        static member SimpleUpdate (s : Obstacle, ctx : CanvasRenderingContext2D) =
            let dx = (s.targetX - s.x)
            let dy = (s.targetY - s.y)
            let dist2 = dx * dx + dy * dy
            if dist2 > s.speed * s.speed then
                let distRatio = s.speed / Math.Sqrt dist2
                s.x <- s.x + distRatio * dx
                s.y <- s.y + distRatio * dy
            else
                s.x <- s.targetX
                s.y <- s.targetY

        [<JavaScript>]
        member s.Draw (ctx : CanvasRenderingContext2D) =
            s.draw (s, ctx)

    type DemoData =
        {
            ctx : CanvasRenderingContext2D
            mutable obstacles : Obstacle[]
        }

    type Event =
        {
            dt : int
            a : DemoData -> unit
        }

    [<JavaScript>]
    let events : Event[] =
        let shiftObstacle count (arr : Obstacle[]) =
            if arr.Length > count then
                arr|>shift
            if arr.Length >= count then
                arr.[0].targetY <- -height
        let nextSpike color xpos =
            fun (dd : DemoData) ->
                shiftObstacle 1 dd.obstacles
                let x = xpos * width
                dd.obstacles |> push { x = x
                                       y = height
                                       targetX = x
                                       targetY = height / 2.
                                       color = color
                                       speed = height / 4.
                                       update = Obstacle.SimpleUpdate
                                       draw =
                                        fun (s, ctx) ->
                                            ctx.FillStyle <- s.color
                                            ctx.BeginPath ()
                                            ctx.MoveTo (s.x, s.y)
                                            ctx.LineTo (s.x + Obstacle.r / 8., s.y + Obstacle.r / 2.)
                                            ctx.LineTo (s.x - Obstacle.r / 8., s.y + Obstacle.r / 2.)
                                            ctx.Fill () }
        let drawStr str (size : int) (s : Obstacle, ctx : CanvasRenderingContext2D) =
            ctx.Font <- (string size) + "pt title"
            ctx.FillStyle <- s.color
            let tm = ctx.MeasureText str
            ctx.FillText (str, s.x - tm.Width / 2., s.y)
        let renderTexts texts size =
            texts
            |> Array.map (fun (x, y, color, str) ->
                {x = width*x
                 y = height
                 targetX = width*x
                 targetY = height*y
                 color = color
                 speed = height / 16.
                 update = Obstacle.SimpleUpdate
                 draw = drawStr str size})
        let spawnText texts =
            fun dd -> dd.obstacles <- renderTexts texts 70
        let addText texts size =
            fun dd -> dd.obstacles <- Array.append dd.obstacles (renderTexts texts size)
        [|
            yield {dt = 40
                   a = spawnText
                        [|
                         1./6.,   0.2, "#f53", "H"
                         2./6.,   0.2, "#f53", "e"
                         3./6.,   0.2, "#f53", "l"
                         4./6.,   0.2, "#f53", "l"
                         5./6.,   0.2, "#f53", "o"
                         1./12.,  0.6, "#58e", "d"
                         3./12.,  0.6, "#58e", "e"
                         5./12.,  0.6, "#58e", "m"
                         7./12.,  0.6, "#58e", "o"
                         9./12.,  0.6, "#58e", "j"
                         11./12., 0.6, "#58e", "s"
                        |]}
            yield {dt = 60
                   a = fun dd ->
                        dd.obstacles |> Array.iter (fun o ->
                            o.targetY <- -height)}
            yield {dt = 20
                   a = spawnText
                        [|
                         3./14.,  0.2,  "#d07", "I"
                         5./14.,  0.2,  "#58e", "c"
                         7./14.,  0.2,  "#58e", "a"
                         9./14.,  0.2,  "#58e", "n"
                         11./14., 0.2,  "#58e", "t"
                         5./20.,  0.45, "#1a2", "b"
                         7./20.,  0.45, "#1a2", "e"
                         9./20.,  0.45, "#d80", "h"
                         11./20., 0.45, "#d80", "e"
                         13./20., 0.45, "#d80", "r"
                         15./20., 0.45, "#d80", "e"
                         5./22.,  0.7,  "#f53", "w"
                         7./22.,  0.7,  "#f53", "i"
                         9./22.,  0.7,  "#f53", "t"
                         11./22., 0.7,  "#f53", "h"
                         13./22., 0.7,  "#24d", "y"
                         15./22., 0.7,  "#24d", "o"
                         17./22., 0.7,  "#24d", "u"
                        |]}
            yield {dt = 60
                   a = fun dd ->
                        dd.obstacles |> Array.iter (fun o ->
                            o.targetY <- -height)}
            yield {dt = 20
                   a = spawnText
                        [|
                         5./22.,  0.2,  "#58e", "S"
                         7./22.,  0.2,  "#58e", "o"
                         9./22.,  0.2,  "#d07", "I"
                         11./22., 0.2,  "#24d", "j"
                         13./22., 0.2,  "#24d", "u"
                         15./22., 0.2,  "#24d", "s"
                         17./22., 0.2,  "#24d", "t"
                         5./20.,  0.45, "#f53", "w"
                         7./20.,  0.45, "#f53", "a"
                         9./20.,  0.45, "#f53", "n"
                         11./20., 0.45, "#f53", "t"
                         13./20., 0.45, "#f53", "e"
                         15./20., 0.45, "#f53", "d"
                         3./14.,  0.7,  "#1a2", "t"
                         5./14.,  0.7,  "#1a2", "o"
                         7./14.,  0.7,  "#d80", "s"
                         9./14.,  0.7,  "#d80", "a"
                         11./14., 0.7,  "#d80", "y"
                        |]}
            yield {dt = 60
                   a = fun dd ->
                        dd.obstacles |> Array.iter (fun o ->
                            o.targetY <- -height)}
            yield {dt = 20
                   a = spawnText
                        [|
                         0.12, 0.15, "#444", " "
                         0.12, 0.25, "#ff0", " "
                         0.05, 0.25, "#444", " "
                         0.25, 1.1,  "#444", " "
                         0.35, 0.6,  "#ff0", " "
                         0.35, 0.8,  "#ff0", " "
                         0.45, 1.1,  "#444", " "
                         0.58, 0.25, "#ff0", " "
                         0.58, 0.15, "#444", " "
                         0.58, 0.5,  "#ff0", " "
                         0.58, 0.8,  "#ff0", " "
                         0.71, 1.1,  "#444", " "
                         0.84, 0.15, "#444", " "
                         0.84, 0.25, "#ff0", " "
                         0.84, 0.8,  "#ff0", " "
                         0.91, 0.25, "#444", " "
                        |]}
            yield {dt = 40
                   a = addText [|0.84, 0.5,  "#ff0", ":)"|] 50}
            yield {dt = 60
                   a = addText [|0.09, 0.93, "#ea1", "(the end)"|] 50}
            yield {dt = 10000; a = fun dd ->
                JavaScript.Alert "Hey it's over, what are you still doing here?" }
        |]

    type DemoControl() =
        inherit Web.Control()

        [<JavaScript>]
        let mutable ratioIn = 0.

        [<JavaScript>]
        let mutable frame = 0

        [<JavaScript>]
        let mutable lastEventFrame = 0

        [<JavaScript>]
        let mutable nextEventId = 0

        [<JavaScript>]
        let makeCanvas() =
            let element = HTML5.Tags.Canvas [Attr.Style "width: 100%; height: 100%; background-color: black;"]
            let canvas = As<CanvasElement> element.Dom
            element |> OnAfterRender (fun e ->
                let w = JQuery.Of(element.Dom).Width()
                let h = JQuery.Of(element.Dom).Height()
                canvas.Width <- w
                canvas.Height <- h
                width <- float w
                height <- float h
                let ctx = canvas.GetContext "2d"
                let ts = Array.init numParticles (fun i ->
                    let greyNuance = string (Math.Floor (128. * Math.Random()))
                    let color = "rgb(" + greyNuance + "," + greyNuance + "," + greyNuance + ")"
                    let t = {
                        d1 = width * (minRadius + (maxRadius - minRadius) * Math.Random ())
                        a1 = System.Math.PI * 2. / 3. * Math.Random ()
                        d2 = width * (minRadius + (maxRadius - minRadius) * Math.Random ())
                        a2 = System.Math.PI * 2. / 3. + System.Math.PI * 2. / 3.  * Math.Random ()
                        d3 = width * (minRadius + (maxRadius - minRadius) * Math.Random ())
                        a3 = System.Math.PI * 2. / 3. - System.Math.PI * 2. / 3.  * Math.Random ()
                        cx = 0.; cy = 0.
                        vx = 0.; vy = 0.
                        va = 0.
                        baseColor = color
                        color = color
                    }
                    t.Reinit ()
                    t)
                gx <- 0.
                gy <- 0.5
                let dd =
                    {
                        ctx = ctx
                        obstacles = [||]
                    }
                let loop () =
                    ctx.ClearRect (0., 0., width, height)
                    if events.[nextEventId].dt = frame - lastEventFrame then
                        events.[nextEventId].a dd
                        lastEventFrame <- frame
                        nextEventId <- nextEventId + 1
                    let numDisplayedParticles = min numParticles (42 * frame) - 1
                    for i = 0 to numDisplayedParticles do
                        let t = ts.[i]
                        t.Update ctx
                        dd.obstacles |> Array.iter (fun obstacle ->
                            t.IntersectObstacle (obstacle))
                        t.Draw ctx
                    dd.obstacles |> Array.iter (fun obstacle ->
                        obstacle.Update ctx
                        obstacle.Draw ctx)
                    frame <- frame + 1
                ignore (JavaScript.SetInterval loop 50)
            )
            element

        [<JavaScript>]
        override this.Body =
            let container = Div [Attr.Id "container"]
            container.Append (
                Formlet.Yield (fun s -> int s)
                <*> (Controls.Input "1000"
                     |> Validator.IsInt "Integer value required"
                     |> Enhance.WithValidationIcon
                     |> Enhance.WithLabel (fun () -> Span [Text "Number of particles"]))
                |> Enhance.WithCustomSubmitButton
                    {Enhance.FormButtonConfiguration.Default with
                        Label = Some "Run!"}
                |> Formlet.Run (fun selected ->
                    numParticles <- selected
                    container.Clear()
                    container.Append (makeCanvas()))
            )
            container :> _
